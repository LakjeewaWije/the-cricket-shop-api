import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOrderConfirmationEmail(to: string, order: any) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Order Confirmation - The Cricket Shop',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Order ID: ${order.orderId}</p>
        <p>Total: $${order.total}</p>
        <p>Recipient: ${order.recipientFirstName} ${order.recipientLastName}</p>
        <p>We’ll notify you once your order has shipped.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent to:', to);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
