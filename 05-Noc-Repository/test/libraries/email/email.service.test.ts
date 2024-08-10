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
			html: "<h1>Test</h1>",
			subject: "Test Email",
			to: "ghodrick991@gmail.com",
		});
	});

});
