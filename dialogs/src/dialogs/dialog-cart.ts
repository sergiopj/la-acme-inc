import {
    Action,
    ActionMessage,
    Configuration,
    Dialog,
    PromptCase,
    RouteAction,
    ScreenMessage,
} from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Operation, Entity, CartScreenData, Screen } from '../models';
import { helper } from '../helpers/helpers';
import { ApiClient } from '../clients/api-client';
import { RouteActionType } from '@telefonica/la-bot-sdk/lib/models/dialog';

export default class CartDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.CART}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.CART, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [CartDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(): Promise<void> {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const cart = await helper.getCart(stepContext);
        const screenData: CartScreenData = {
            games: cart,
            totalPrice: cart.reduce((totalPrice, game) => totalPrice + game.price, 0),
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.CART, screenData);

        await sdk.messaging.send(stepContext, message);

        // possible operations
        const choices: string[] = [
            Operation.BACK, // go back
            Operation.REMOVE_CART,
        ];

        return await sdk.messaging.prompt(stepContext, CartDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const action: RouteActionType = [RouteAction.REPLACE, DialogId.CART];

        const cases: PromptCase[] = [
            {
                operation: Operation.BACK,
                action: [RouteAction.POP],
            },
            {
                operation: Operation.REMOVE_CART,
                action,
                logic: async () => {
                    const apiClient = new ApiClient(this.config, stepContext);

                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    const games = await apiClient.getGames();
                    const { title } = helper.getGameById(games, gameId);
                    const cart = await helper.removeGameFromCart(gameId, stepContext);

                    const msg = new ActionMessage().withAction(
                        Action.toast(`${title} fue eliminado de la cesta.`, 'success'),
                    );
                    await sdk.messaging.send(stepContext, msg);

                    if (!cart.length) {
                        action[1] = DialogId.HOME;
                    }
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
