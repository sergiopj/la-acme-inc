import './splash.scss';

import React, { useEffect } from 'react';
import { Preloadable, useAura } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';

const SplashScreen: React.FC<Preloadable> = ({ onReady }: Preloadable) => {
    const { sendCommand } = useAura();

    useEffect(() => {
        onReady();
        setTimeout(() => {
            sendCommand({ intent: Intent.HOME, entities: [] });
        }, 1000);
    }, [onReady, sendCommand]);

    return (
        <div className="splash-screen" id="splash">
            <h1>WELCOME TO ACME INC!</h1>
        </div>
    );
};

export default SplashScreen;
