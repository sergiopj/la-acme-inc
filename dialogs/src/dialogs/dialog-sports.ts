import { Configuration, Dialog, PromptCase, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Intent } from '../models';


/* dialog sports child of HOME dialog */

export default class SportDialog extends Dialog {

    static readonly dialogPrompt = `${DialogId.SPORTS}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.SPORTS, config)
    }

    protected dialogStages(): WaterfallStep[] {
        return [
            this._dialogStage.bind(this),
            this._promptResponse.bind(this)
        ];
    };

    protected prompts(): string[] {
        return [SportDialog.dialogPrompt];
    };

    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    };

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {

        // user choices operations
        const choices: string[] = [
            Intent.BACK// go back
        ];
        return await sdk.messaging.prompt(stepContext, SportDialog.dialogPrompt, choices);
    };

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {

        const cases: PromptCase[] = [{
            operation: Intent.BACK, // go back
            action: [RouteAction.POP]// save this navigation in the routing 
        }];

        return super.promptHandler(stepContext, cases);
    };
}