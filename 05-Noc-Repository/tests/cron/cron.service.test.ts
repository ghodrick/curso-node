import { CronService } from '../../src/libraries/cron/cron.service';
import { CronJob } from 'cron';

jest.mock('cron');

describe('CronService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createJob should create and start a CronJob', () => {
    const mockCronTime = '* * * * *';
    const mockOnTick = jest.fn();

    const mockStart = jest.fn();
    (CronJob as jest.Mock).mockImplementation(() => ({
      start: mockStart,
    }));

    const job = CronService.createJob(mockCronTime, mockOnTick);

    expect(CronJob).toHaveBeenCalledWith(mockCronTime, mockOnTick);
    expect(mockStart).toHaveBeenCalled();
    expect(job).toBeDefined();
  });

  test('createJob should work with Date object as cronTime', () => {
    const mockCronTime = new Date();
    const mockOnTick = jest.fn();

    const mockStart = jest.fn();
    (CronJob as jest.Mock).mockImplementation(() => ({
      start: mockStart,
    }));

    const job = CronService.createJob(mockCronTime, mockOnTick);

    expect(CronJob).toHaveBeenCalledWith(mockCronTime, mockOnTick);
    expect(mockStart).toHaveBeenCalled();
    expect(job).toBeDefined();
  });
});
