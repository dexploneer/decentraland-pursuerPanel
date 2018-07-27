import { createElement, Vector3Component } from 'metaverse-api';


interface IProps {
   pointPosition?:Vector3Component,
   pointRotation?:Vector3Component,
   defaultPos:Vector3Component,
   defaultRotation?:Vector3Component,
   scale:Vector3Component,
   distance?:number,
   border:number,
   enabled?:boolean,
   leftTexture?:string,
   rightTexture?:string,
   upTexture?:string,
   downTexture?:string
}

const DEFAULT_POINT:Vector3Component = { x: 0, y: 0, z: 0 };

const toRadians = (angle:number) => {
   return angle * (Math.PI / 180);
}


const getDirectionPoint = (origin:Vector3Component, rotation:Vector3Component, distance:number):Vector3Component => {
    const point:any = {};
    const radRotation:any = {};

    radRotation.x = toRadians(rotation.x);
    radRotation.y = toRadians(rotation.y);
    radRotation.z = toRadians(rotation.z);

    point.x = origin.x + (distance * Math.cos(radRotation.z) * Math.sin(radRotation.y));
    point.y = origin.y + (distance * Math.sin(-radRotation.x));
    point.z = origin.z + (distance * Math.cos(radRotation.z) * Math.cos(radRotation.y));

    return point;
 }


export const PursuerPanel = (props:IProps) => {
    if(props.pointPosition == undefined){
        props.pointPosition = DEFAULT_POINT;
    }
    if(props.pointRotation == undefined){
        props.pointRotation = DEFAULT_POINT;
    }
    if(props.distance == undefined){
        props.distance = 1;
    }
    if(props.defaultRotation == undefined) {
        props.defaultRotation = DEFAULT_POINT;
    }

    let point:Vector3Component = props.defaultPos;
    let rotation:Vector3Component = props.defaultRotation;
    
    if(props.enabled) {
        rotation = props.pointRotation;
        point = getDirectionPoint(
            props.pointPosition, 
            props.pointRotation, 
            props.distance
        );
    }
 
    return (
       <entity position={point} rotation={rotation}>
         <material id="PPLeft_material" albedoTexture={props.leftTexture} roughness={1}/>
         <material id="PPRight_material" albedoTexture={props.rightTexture} roughness={1}/>
         <material id="PPUp_material" albedoTexture={props.upTexture} roughness={1}/>
         <material id="PPDown_material" albedoTexture={props.downTexture} roughness={1}/>

    
         <plane 
            position={{ x: -(props.scale.x / 2) + (props.border / 2), y: 0, z: 0 }} 
            scale={{ x: props.border, y: props.scale.y, z: 1 }}
            color="#FFFFFF" 
            material="#PPLeft_material"
            id="PPPanelLeft"
         />
         <plane 
            position={{ x: (props.scale.x / 2) - (props.border / 2), y: 0, z: 0 }}
            scale={{ x: props.border, y: 1, z: 1 }}
            color="#FFFFFF" 
            material="#PPRight_material"
            id="PPPanelRight"
         />
         <plane 
            position={{ x: 0, y: (props.scale.y / 2) - (props.border / 2), z: 0 }}
            scale={{ x: props.scale.x - (props.border * 2), y: props.border, z: 1 }}
            color="#FFFFFF" 
            material="#PPUp_material"
            id="PPPanelUp"
         />
         <plane 
            position={{ x: 0, y: -(props.scale.y / 2) + (props.border / 2), z: 0 }}
            scale={{ x: props.scale.x - (props.border * 2), y: props.border, z: 1 }}
            color="#FFFFFF" 
            material="#PPDown_material"
            id="PPPanelDown"
         />
       </entity>
    );
}