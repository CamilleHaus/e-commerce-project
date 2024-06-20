import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import prisma from "@/lib/prismaDB";
import Stripe from "stripe";
import { CartEntry } from "use-shopping-cart/core";
import { it } from "node:test";
import { error } from "console";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10"
});

const manageStripePaymentIntent = async (payment_intent_id: string, total: number) => {

    if (payment_intent_id) {
        return await stripe.paymentIntents.update(payment_intent_id, { amount: total })
    }

    return await stripe.paymentIntents.create({
        amount: total,
        currency: "USD",
        automatic_payment_methods: { enabled: true }
    })
}

// Essa função vai atualizar o payment_intent que é criado quando clicamos no checkout caso a gente volte e atualize o carrinho,
// ao invés de ficar criando toda a vez um payment_intent novo

const manageOrderAndDB = async (paymentIntent: any, total: number, items: CartEntry[], userId: string) => {

    const existingOrder = await prisma.order.findUnique({
        where: { paymentIntentID: paymentIntent.id }
    })

    if (existingOrder) {
        return await prisma.order.update({
            where: { paymentIntentID: paymentIntent.id },
            data: { userId, amount: total, currency: "usd", status: "awaiting payment" }
        })
    }

    const createOrder = await prisma.order.create({
        data: {
            userId,
            amount: total,
            currency: "usd",
            status: "awaiting payment",
            paymentIntentID: paymentIntent.id
        }
    })

    const orderItem = items.map(async (item) => {
        await prisma.orderItem.create({
            data: {
                orderId: createOrder.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
                size: item.size
            }
        })
    })

    await Promise.all(orderItem)

    return createOrder
}

export async function POST(req: NextRequest) {

    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "not signed in" }, { status: 403 })
    }

    const userId = user.id
    const body = await req.json()
    const { items, payment_intent_id, totalAmount } = body
    const total = totalAmount

    try {

        const paymentIntent = await manageStripePaymentIntent(payment_intent_id, total)
        const order = await manageOrderAndDB(payment_intent_id, total, items, userId)

        return NextResponse.json({ paymentIntent })
    } catch (error) {
        console.error(error)
    }



}