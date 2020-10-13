import AuraDirectlineClient from '@telefonica/la-web-sdk/dist/services/aura/AuraDirectlineClient';
import { AuraOptions } from './main';

export type VoidFunc = () => void;

export class PrivateClient {
    appContext: any;
    livingAppStart: VoidFunc;
}

export default class AuraDirectLineKlient extends AuraDirectlineClient {
    private private: PrivateClient;
    private originalLivingAppStart: VoidFunc;
    private originalLivingAppName: string;

    constructor(options: AuraOptions) {
        super(options);

        this.private = this as any;
        this.private.appContext.livingApp.gkName = options.gkName;
        this.originalLivingAppStart = this.private.livingAppStart;
        this.private.livingAppStart = () => {
            // replace the generikon la name with the specific "la instance"
            this.originalLivingAppName = this.private.appContext.livingApp.name;
            this.private.appContext.livingApp.generik = this.originalLivingAppName;
            this.private.appContext.livingApp.name = options.gkName;
            this.originalLivingAppStart();
        };
    }
}
