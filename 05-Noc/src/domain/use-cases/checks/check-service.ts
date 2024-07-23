interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly onSuccess: SuccessCallback,
        private readonly onError: ErrorCallback
    ) {

    }

    async execute(url: string): Promise<boolean> {

        try {

            const resultado = await fetch(url);

            if (!resultado.ok)
            {
                throw new Error(`Error on check service ${url}`);
            }

            this.onSuccess();

            return true;
        }
        catch (error)
        {
            this.onError(`${error}`);

            return false;
        }
    }

}