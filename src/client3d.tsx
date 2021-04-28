import React, { Component, createRef } from 'react';
import { Vector3, Color3 } from '@babylonjs/core';
import { Scene, Engine, useBeforeRender, useClick, useHover } from 'react-babylonjs';
import { ActionManager, SetValueAction } from '@babylonjs/core/Actions';
import { ScaledModelWithProgress } from './ScaledModelWithProgress'

interface INotificationBoxProps {

};

interface INotificationBoxState {
    color: Color3;
    avocadoYPos: number;
    avocadoScaling: number;
}

const getRandomColor = (function () {
    // const Colors = ['#4F86EC', '#D9503F', '#F2BD42', '#58A55C'];
    const Colors = [[0.31, 0.53, 0.93, 1], [0.85, 0.31, 0.25, 1], [0.95, 0.74, 0.26, 1], [0.35, 0.65, 0.36, 1]];

    let i = 0;
    return () => {
        i++;
        return Colors[i % Colors.length];
    }
})();

// class WithUseClick extends Component<INotificationBoxProps, INotificationBoxState>
// {
//     private ref = createRef<HTMLDivElement>();

//     constructor(props) {
//         super(props);
//         this.state = {
//             color: Color3.FromArray(getRandomColor()),
//             avocadoYPos: -1.5,
//             avocadoScaling: 3.0
//         };
//     }

//     render() {
//         return (<sphere name='sphere1' ref={this.ref}
//             diameter={2} segments={32}
//             position={new Vector3(0, 1, 0)}>
//             <standardMaterial name='mat' diffuseColor={this.state.color} />
//         </sphere>);
//     }
// }


export class Client3D extends Component<INotificationBoxProps, INotificationBoxState> {
    constructor(props:INotificationBoxProps) {
        super(props);
        this.state = {
            color: Color3.FromArray(getRandomColor()),
            avocadoYPos: -1.5,
            avocadoScaling: 3.0
        };
    }

    onModelLoaded = (model:any, sceneContext:any) => {
        const mesh = model.meshes[1]
        mesh.actionManager = new ActionManager(sceneContext.scene)
        mesh.actionManager.registerAction(
            new SetValueAction(
                ActionManager.OnPointerOverTrigger,
                mesh.material,
                'wireframe',
                true
            )
        )
        mesh.actionManager.registerAction(
            new SetValueAction(
                ActionManager.OnPointerOutTrigger,
                mesh.material,
                'wireframe',
                false
            )
        )
    }

    render() {
        const baseUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
        return (
            <div>
                <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
                    <Scene>
                        <arcRotateCamera name='camera1' alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
                        <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />

                        <ScaledModelWithProgress rootUrl={`${baseUrl}BoomBox/glTF/`} sceneFilename='BoomBox.gltf' scaleTo={3}
                            progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(2.5, 0, 0)}
                            onModelLoaded={this.onModelLoaded}
                        />

                        {/*<React.Suspense fallback={<box />}>
              <Model rootUrl={`${baseUrl}Avocado/glTF/`} sceneFilename='Avocado.gltf' />
          </React.Suspense>
          */}

                        <ScaledModelWithProgress rootUrl={`${baseUrl}Avocado/glTF/`} sceneFilename='Avocado.gltf'
                            scaleTo={this.state.avocadoScaling}
                            progressBarColor={Color3.FromInts(255, 165, 0)}
                            center={new Vector3(-2.5, this.state.avocadoYPos, 0)}
                        />
                    </Scene>
                </Engine>
            </div>
        );
    };
}

export default Client3D;