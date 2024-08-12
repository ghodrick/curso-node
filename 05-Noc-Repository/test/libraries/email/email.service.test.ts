import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./../../../src/libraries/email/email.service";

describe("EmailService", () => {
	const mockSendMail = jest.fn();

	nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail });

	test("should send email", async () => {
		const emailService = new EmailService();

		const options: SendMailOptions = {
			to: "ghodrick991@gmail.com",
			subject: "Test Email",
			htmlBody: "<h1>Test</h1>",
		};

		await emailService.sendEmail(options);

		expect(mockSendMail).toHaveBeenCalledWith({
			attachments: expect.any(Array),
			html: options.htmlBody,
			subject: options.subject,
			to: options.to,
		});
	});

	test("should handle error when sending email", async () => {
		const emailService = new EmailService();

		const options: SendMailOptions = {
			to: "ghodrick991@gmail.com",
			subject: "Test Email",
			htmlBody: "<h1>Test</h1>"
		};

		mockSendMail.mockImplementation(() => {
			throw new Error("Error sending email");
		});

		const result = await emailService.sendEmail(options);

		expect(result).toBe(false);

		expect(mockSendMail).toHaveBeenCalledWith({
			attachments: expect.any(Array),
			html: options.htmlBody,
			subject: options.subject,
			to: options.to,
		});
	});
});