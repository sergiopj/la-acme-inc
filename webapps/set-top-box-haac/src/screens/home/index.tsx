import './home.scss';

import {
    KeyCode,
    KeyEvent,
    NavigableButton,
    screenReady,
    useBackground,
    useInput,
    useAura,
} from '@telefonica/custom-la-web-sdk';
import { HomeScreenData, Category } from '../../../../../dialogs/src/models';
import React, { useEffect, useCallback, useState } from 'react';
import { Intent } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenData> = (data: HomeScreenData) => {
    const { currentItems, title } = data;
    const background = useBackground();
    const { sendCommand } = useAura();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        background.clearBackground();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onKeyPressed = useCallback(
        (e: KeyEvent) => {
            switch (e.data.keyCode) {
                case KeyCode.KEY_LEFT:
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    }
                    break;
                case KeyCode.KEY_RIGHT:
                    if (currentIndex < currentItems.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    }
                    break;
                default:
                    break;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentIndex],
    );
    useInput(onKeyPressed);

    useEffect(() => {
        background.setBackground(currentItems[currentIndex].img);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const goToCategory = (genre: string) => {
        let intent = Intent.HOME;
        switch (genre) {
            case 'adventure':
                intent = Intent.ADVENTURE;
                break;
            case 'action':
                intent = Intent.ACTION;
                break;
            case 'sports':
                intent = Intent.SPORTS;
                break;
            case 'simulation':
                intent = Intent.SIMULATION;
                break;
            default:
                break;
        }
        sendCommand({
            intent: 'intent.la-generikon.generik',
            entities: [{ type: 'ent.dynamic_intent' as string, entity: intent }],
        });
    };

    return (
        <div className="home-screen">
            <h1 className="title">{title}</h1>
            {currentItems.map((category: Category, index: number) => (
                <div className="home-section" key={category.id}>
                    <NavigableButton
                        onClick={() => {
                            setCurrentIndex(index);
                            goToCategory(category.name);
                        }}
                        defaultClass="button"
                        focusedClass="focus"
                        defaultFocused={index === 0}
                        id={category.id}
                    >
                        Go to {category.name}
                    </NavigableButton>
                </div>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
