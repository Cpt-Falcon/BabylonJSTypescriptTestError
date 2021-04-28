import React, { Component, Suspense  } from 'react';
import { Vector3, Color3 } from '@babylonjs/core';
import { Scene, Engine, Model} from 'react-babylonjs';
import { ActionManager, SetValueAction } from '@babylonjs/core/Actions';
import ScaledModelWithProgress from './ScaledModelWithProgress'

interface INotificationBoxProps {

};

interface INotificationBoxState {
    avocadoYPos: number;
    avocadoScaling: number;
}

export class Client3D extends Component<INotificationBoxProps, INotificationBoxState> {
    constructor(props:INotificationBoxProps) {
        super(props);
        this.state = {
            avocadoYPos: -1.5,
            avocadoScaling: 3.0
        };
    }

    onModelLoaded  = (model:any, sceneContext:any) => {
        let mesh = model.meshes[1]
        mesh.actionManager = new ActionManager(mesh._scene)
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
            <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
                <Scene>
                <arcRotateCamera name='camera1' alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
                <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
        
                {/* <ScaledModelWithProgress rootUrl={`${baseUrl}BoomBox/glTF/`} sceneFilename='BoomBox.gltf' scaleTo={3}
                    progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(2.5, 0, 0)}
                    onModelLoaded={this.onModelLoaded}
                /> */}
        
                <Suspense fallback={<box name='fallback' position={new Vector3(-2.5, this.state.avocadoYPos, 0)} />}>
                    <Model name="test2" rootUrl={`${baseUrl}Avocado/glTF/`} sceneFilename='Avocado.gltf' scaleToDimension={this.state.avocadoScaling} position={new Vector3(-2.5, this.state.avocadoYPos, 0)} />
                </Suspense>
                </Scene>
          </Engine>
        );
    };
}

export default Client3D;