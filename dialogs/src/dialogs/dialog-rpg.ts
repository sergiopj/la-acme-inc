import { Configuration, Dialog, PromptCase, RouteAction, ScreenMessage } from '@telefonica/la-bot-sdk';
import { ApiClient } from '../clients/api-client';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Intent, GameScreenData, Screen, Game } from '../models';

/* dialog rpg child of HOME */

export default class RPGDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.RPG}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.RPG, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [RPGDialog.dialogPrompt];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        // instantiate the client
        const apiClient = new ApiClient(this.config, stepContext);

        // videogames categories data
        let games = await apiClient.getRPG();

        // TODO mapear en el cliente results
        games = games['results'];

        // add description field in game
        for (let index = 0; index < games.length; index++) {
            const game: Game = games[index];
            const gameInfo = await apiClient.getGameInfo(game.slug);
            game.description = gameInfo['description'];
        }

        const screenData: GameScreenData = {
            title: 'RPG VIDEOGAMES',
            games,
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.RPG, screenData);

        await sdk.messaging.send(stepContext, message);
        // user choices operations
        const choices: string[] = [
            Intent.BACK, // go back
        ];
        return await sdk.messaging.prompt(stepContext, RPGDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: Intent.BACK, // go back
                action: [RouteAction.POP], // save this navigation in the routing
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}