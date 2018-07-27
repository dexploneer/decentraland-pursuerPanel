import { createElement, ScriptableScene, Vector3Component } from 'metaverse-api'
import { PursuerPanel } from 'src/PursuerPanel';

const PANEL_DISTANCE = 1.2;
const PANEL_BORDER = 0.2;

export interface SceneState {
  cameraPosition:Vector3Component,
  cameraRotation:Vector3Component,
  panelEnabled:boolean,
  panelPos:Vector3Component,
  panelRotation:Vector3Component,
  panelScale:Vector3Component
}

export default class MainScene extends ScriptableScene<any, SceneState> {
  state = { 
    cameraPosition: { x: 0, y: 0, z: 0 },
    cameraRotation: { x: 0, y: 0, z: 0 },
    panelEnabled: false,
    panelPos: { x: 0, y: 0, z: 0 },
    panelScale: { x: 1.8, y: 1, z: 1 },
    panelRotation: { x: 0, z: 0, y: 0 }
  };

  props = {
    lastRotation: { x:0, y:0, z: 0 }
  }

  sceneDidMount() {
    this.subscribeTo('positionChanged', e => {     
      
      if(e.cameraPosition.x > 0 && 
         e.cameraPosition.x <= 10 && 
         e.cameraPosition.z >= 0.5 && 
         e.cameraPosition.z <= 10) {

        if(!this.state.panelEnabled) {
          this.setState({ panelEnabled: true})
        }
        
        this.setState({ panelPos: e.cameraPosition, panelRotation: this.props.lastRotation });
      }
      else if(this.state.panelEnabled){
        this.setState({ 
          panelEnabled: false
        });
      }
    });

    this.subscribeTo('rotationChanged', e => {
      this.props.lastRotation = e.rotation;
      if(!this.state.panelEnabled){ return; }
     
      this.setState({ 
          panelRotation: this.props.lastRotation
      });
    });   
  }


  sceneWillUnmount() {
  

  }

  async render() {
    return (
      <scene>
          <material id="marble_material" albedoTexture="texture/marble.jpg" roughness={1}/>

          <plane position={{ x: 5, y: 0, z: 5 }} scale={{ x: 9.99, y: 9.99, z: 1 }} rotation={{ x: 90, y: 0, z: 0 }} material="#marble_material"/>
          <box position={{x: 2, y: 1, z: 0.5}} scale={{ x: 4, y: 2, z: 1 }} material="#marble_material"/>
          <box position={{x: 7.99, y: 1, z: 0.5}} scale={{ x: 4, y: 2, z: 1 }} material="#marble_material"/>
          <box position={{x: 0.5, y: 1, z: 5}} scale={{ x: 1, y: 2, z: 8 }} material="#marble_material"/>
          <box position={{x: 9.499, y: 1, z: 5}} scale={{ x: 1, y: 2, z: 8 }} material="#marble_material"/>
          <box position={{x: 5, y: 1, z: 9.499}} scale={{ x: 9.99, y: 2, z: 1 }} material="#marble_material"/>


          <gltf-model position={{ x: 5, y: 0, z: 7.5}} scale={{ x: 10, y: 10, z: 8.5 }} rotation={{ x: 90, y: 0, z: 0 }} src="models/column/scene.gltf"/>
          
          <PursuerPanel 
            defaultPos={{x: 5, y: 4.5, z: 7.5}}
            defaultRotation={{x: 0, y: 0, z: 0}}
            pointPosition={this.state.panelPos} 
            pointRotation={this.state.panelRotation}
            scale={this.state.panelScale}  
            border={PANEL_BORDER}
            distance={PANEL_DISTANCE}
            enabled={this.state.panelEnabled}
            leftTexture="/texture/0.jpg"
            rightTexture="/texture/1.jpg"
            upTexture="/texture/2.jpg"
            downTexture="/texture/3.jpg"
          />
      </scene>
    )
  }
}
