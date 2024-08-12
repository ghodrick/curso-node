import { CronJob } from "cron";
import { CronService } from "../../../src/libraries/cron/cron.service";

jest.mock("cron");

describe("CronService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Configurar el mock de CronJob
		(CronJob as jest.MockedClass<any>).mockImplementation(() => ({
			start: jest.fn(),
		}));
	});

	test("createJob should create and start a CronJob", () => {
		const mockCronTime = "* * * * *";
		const mockOnTick = jest.fn();

		const job = CronService.createJob(mockCronTime, mockOnTick);

		expect(CronJob).toHaveBeenCalledWith(mockCronTime, mockOnTick);
		expect(job.start).toHaveBeenCalled();
	});

	test("createJob should work with Date object as cronTime", () => {
		const mockCronTime = new Date();
		const mockOnTick = jest.fn();

		const job = CronService.createJob(mockCronTime, mockOnTick);

		expect(CronJob).toHaveBeenCalledWith(mockCronTime, mockOnTick);
		expect(job.start).toHaveBeenCalled();
		expect(job).toBeDefined();
	});
});
