# decentraland-pursuerPanel

Pursuer Panel is a flat plug and play panel that follow you until you are in certain areas or until you not pay a fee. The panel can be coated with advertising banners on any of four sides (simple textures at moment). This kind of panel can be helpful in free to play zones when premium users can avoid it with paying a fee or performing particular actions.

```import { PursuerPanel } from 'src/PursuerPanel';```

```
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
```

###### PROPERTIES

| Name             | Type              | Default       | Description                                                         | optional |
| ---------------- | ----------------- | ------------- | ------------------------------------------------------------------- | -------- |
| defaultPos       | Vector3Component  |               | default position of the panel, used when ```enabled=false```        | no       |
| defaultRotation  | Vector3Component  | {x:0,y:0,z:0} | default rotation of the panel, used when ```enabled=false```        | yes      |
| pointPosition    | Vector3Component  | {x:0,y:0,z:0} | the point that must be pursued, used when ```enabled=true```        | yes      |
| pointRotation    | Vector3Component  | {x:0,y:0,z:0} | the point rotation that must be pursued, used when```enabled=true```| yes      |
| scale            | Vector3Component  |               | the panel size coordinates                                          | no       |
| border           | number            |               | the panel border size                                               | no       |
| distance         | number            | 1             | distance between the point to be pursued and the panel              | yes      |
| enabled          | boolean           | false         | indicates if the panel should chase a point                         | yes      |
| leftTexture      | string            | undefined     | path of the left texture of the panel                               | yes      |
| rightTexture     | string            | undefined     | path of the right texture of the panel                              | yes      |
| upTexture        | string            | undefined     | path of the up texture of the panel                                 | yes      |
| downTexture      | string            | undefined     | path of the down texture of the panel                               | yes      |



You can learn more about our JSX-style lifecycle and rendering in our documentation: https://docs.decentraland.org/

Install the CLI

Download and install the Decentraland CLI by running the following command

```npm i -g decentraland```

For a more details, follow the steps in the Installation guide.

Previewing the scene

Once you've installed the CLI, download this example and navigate to its directory from your terminal or command prompt.

from the scene directory:

```$:  dcl preview```
Any dependencies are installed and then the CLI will open the scene in a new browser tab automatically.
