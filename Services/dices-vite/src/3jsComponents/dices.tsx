import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useRef, useEffect, useState} from "react";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import type { RootState } from '..//app/store'

import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../features/counter/counterSlice';


interface DicesProps {
    dice_1:number;
    dice_2:number;
    playing_bool: boolean;
}


var firstDisplay:boolean = true;
var dice_1_final_orientation:any = {};
var dice_2_final_orientation:any = {};

dice_1_final_orientation.x = 0.0;
dice_1_final_orientation.y = 0.0;
dice_1_final_orientation.z = 0.0;

dice_2_final_orientation.x = 0.0;
dice_2_final_orientation.y = 0.0;
dice_2_final_orientation.z = 0.0;

var times_called:number = 0;

var lightCenter: THREE.DirectionalLight;
var lightLeft: THREE.DirectionalLight;
var lightRight: THREE.DirectionalLight;
var lightUp: THREE.DirectionalLight;
var lightDown: THREE.DirectionalLight;
var lightFaces: THREE.DirectionalLight;

var textMaterial: THREE.Material; 

var wonTextGeometry: THREE.BufferGeometry;
var lostTextGeometry: THREE.BufferGeometry;

var textMesh:THREE.Mesh;
var textMeshLost:THREE.Mesh;
const scene = new THREE.Scene();

var canvasRef:HTMLElement; 
var renderer : THREE.WebGLRenderer;
var height = 200;
var width = 250;

var dice_1:any;
var dice_2:any;

const camera = new THREE.PerspectiveCamera( 120, width / height , 3, 7);
var refContainer:any;


const dices = (dices_goal:DicesProps) => {
    
    const [_dices_playing_bool, setPlayingBool] = useState(dices_goal.playing_bool);
    
    var [firstDisplayVar, _setFirstDisplay] = useState(firstDisplay);
    var [dice_1_final_orientationVar, _set_dice_1_final_orientation] = useState(dice_1_final_orientation);
    var [dice_2_final_orientationVar, _set_dice_2_final_orientation] = useState(dice_2_final_orientation);

    refContainer = useRef(null);
    
    const zoom:number = 4;

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const displayed = useSelector((state:RootState) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {

        
        
        times_called++;
        
        canvasRef = document.getElementById('3js-comp-dices')!;
        renderer = new THREE.WebGLRenderer({
            antialias:true,
            canvas: canvasRef
        });
        
        function changeOpacityMesh(mesh: THREE.Mesh, opacity_n:number) {
            if(mesh != null){

                if (mesh.material instanceof THREE.Material) {

                    mesh.material.opacity = opacity_n;
                    
                } else if (Array.isArray(mesh.material)) {
                    for (const material of mesh.material) {
                        material.opacity = opacity_n;
                    }
                }

            }

            
        }
        
                
        const opacity_end:number = 1;
        const opacity_start:number = 0;
        const opacity_change_frames = 30;
        var frame_n:number = 0;

        const loadDices = () => {
            return new Promise((resolve, _reject) => {
                init();
                resolve(true);
            });
        };
        


        function init(){
           
            camera.zoom = zoom;
            renderer.setSize( width ,  height );

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            //Create a DirectionalLight and turn on shadows for the light
            lightCenter = new THREE.DirectionalLight( 0xEBDD63, 5 );
            lightCenter.position.set( 0, 0, 20 );
            lightCenter.castShadow = true;
            scene.add( lightCenter );

            lightCenter.shadow.mapSize.width = 512; 
            lightCenter.shadow.mapSize.height = 512;
            lightCenter.shadow.camera.near = 0.5; 
            lightCenter.shadow.camera.far = 50;

            lightLeft = new THREE.DirectionalLight( 0xEBDD63, 5 );
            lightLeft.position.set( -5, 0, 20 ); 
            lightLeft.castShadow = true;
            scene.add( lightLeft );

            lightLeft.shadow.mapSize.width = 512; 
            lightLeft.shadow.mapSize.height = 512; 
            lightLeft.shadow.camera.near = 0.5; 
            lightLeft.shadow.camera.far = 500; 

            lightRight = new THREE.DirectionalLight( 0xEBDD63, 5 );
            lightRight.position.set( 5, 0, 20 );
            lightRight.castShadow = true;
            scene.add( lightRight );

            lightRight.shadow.mapSize.width = 512;
            lightRight.shadow.mapSize.height = 512;
            lightRight.shadow.camera.near = 0.5;
            lightRight.shadow.camera.far = 500;

            lightUp= new THREE.DirectionalLight( 0xEBDD63, 5 );
            lightUp.position.set( 0, 20, 10 );
            lightUp.castShadow = true;
            scene.add( lightUp );

            lightUp.shadow.mapSize.width = 512; 
            lightUp.shadow.mapSize.height = 512;
            lightUp.shadow.camera.near = 0.5;
            lightUp.shadow.camera.far = 500;

            lightDown = new THREE.DirectionalLight( 0xEBDD63, 5 );
            lightDown.position.set( 0, -20, 10 );
            lightDown.castShadow = true;
            scene.add( lightDown );

            lightDown.shadow.mapSize.width = 512;
            lightDown.shadow.mapSize.height = 512;
            lightDown.shadow.camera.near = 0.5;
            lightDown.shadow.camera.far = 500;

            lightFaces = new THREE.DirectionalLight( 0xEBDD63, 1000 );
            lightFaces.position.set( 0, 2, 5 );
            lightFaces.castShadow = true;
            scene.add( lightFaces );

            lightFaces.shadow.mapSize.width = 512;
            lightFaces.shadow.mapSize.height = 512;
            lightFaces.shadow.camera.near = 0.5;
            lightFaces.shadow.camera.far = 500;
            
            const loader = new GLTFLoader();

            

            loader.load( '/DiceRoundColouredGray.gltf', function ( gltf ) {

                gltf.scene.scale.set(60, 60, 60);

                dice_1 = gltf.scene;
                dice_1.castShadow = true;
                dice_1.receiveShadow = true;

                dice_1.position.set( 1.4, 0 , 0 );
                if(!firstDisplayVar){
                    dice_1.rotation.set(dice_1_final_orientationVar.x, dice_1_final_orientationVar.y, dice_1_final_orientationVar.z);
                }
                
                scene.add(dice_1);

            }, undefined, function ( error ) {

                console.error( error );

            } );

            loader.load( '/DiceRoundColouredGray.gltf', function ( gltf ) {

                gltf.scene.scale.set(60, 60, 60);

                dice_2 = gltf.scene;
                dice_2.castShadow = true;
                dice_2.receiveShadow = true;

                dice_2.position.set( -1.4, 0 , 0 );

                if(!firstDisplayVar){
                    dice_2.rotation.set(dice_2_final_orientationVar.x, dice_2_final_orientationVar.y, dice_2_final_orientationVar.z);
                }else{
                    dice_2.rotation.set(0,0,0);
                }

                scene.add(dice_2);

            }, undefined, function ( error ) {

                console.error( error );

            } );

            const fontLoader = new FontLoader();
            
            camera.rotation.x = - 2 * Math.PI / 16;
            camera.position.z = 5;
            camera.position.y = 2;
            camera.position.x = 0;
            
            fontLoader.load( '/fonts/OpenSans_Regular.typeface.json', function ( font ) {
        
                wonTextGeometry = new TextGeometry( 'You won!', {
                    font: font,
                    size: 1.5,
                    depth: 1.5,
                    curveSegments: 16,
                    bevelEnabled: false,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                } );
                

                //Compute the bounding box of the text
                wonTextGeometry.computeBoundingBox();
                const boundingBox = wonTextGeometry.boundingBox!;
                const textWidth = boundingBox.max.x - boundingBox.min.x;
                const textHeight = boundingBox.max.y - boundingBox.min.y;

                //Center the text
                wonTextGeometry.translate(-textWidth / 2, -textHeight / 2, 0);

                //Create the text mesh and add it to the scene
                textMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0});
                textMesh = new THREE.Mesh(wonTextGeometry, textMaterial);

                //Set the y-position to -2
                textMesh.position.y = -2.5;

                //Adjust the scale to fit the canvas
                const canvasWidth = width;
                const canvasHeight = height;

                const scale = Math.min(canvasWidth / textWidth, canvasHeight / textHeight);
                textMesh.scale.set(scale/(100), scale/(100), scale/(100));

                textMesh.quaternion.copy( camera.quaternion );
                textMesh.rotation.x -= 0.4;

                scene.add(textMesh);

            },);

            fontLoader.load( '/fonts/OpenSans_Regular.typeface.json', function ( font ) {
        
                lostTextGeometry = new TextGeometry( 'You lost!', {
                    font: font,
                    size: 1.5,
                    depth: 1.5,
                    curveSegments: 16,
                    bevelEnabled: false,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                } );
                

                //Compute the bounding box of the text
                lostTextGeometry.computeBoundingBox();
                const boundingBox = lostTextGeometry.boundingBox!;
                const textWidth = boundingBox.max.x - boundingBox.min.x;
                const textHeight = boundingBox.max.y - boundingBox.min.y;

                //Center the text
                lostTextGeometry.translate(-textWidth / 2, -textHeight / 2, 0);

                //Create the text mesh and add it to the scene
                var textMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0});
                textMeshLost = new THREE.Mesh(lostTextGeometry, textMaterial);

                //Set the y-position to -2
                textMeshLost.position.y = -2.5;

                //Adjust the scale to fit the canvas
                const canvasWidth = width;
                const canvasHeight = height;

                const scale = Math.min(canvasWidth / textWidth, canvasHeight / textHeight);
                textMeshLost.scale.set(scale/(100), scale/(100), scale/(100));

                textMeshLost.quaternion.copy( camera.quaternion );
                textMeshLost.rotation.x -= 0.4;

                scene.add(textMeshLost);

            },);
            
        }

        
        function loadScene(){
            THREE.DefaultLoadingManager.onProgress = function ( _item, loaded, total ) {
                // All textures are finished loading when loaded === total
                if(loaded<total){
                    sleep(2000).then(() => { loadScene() });
                }else{
                    
                    renderer.render( scene, camera );
                }
            };

        }
        loadScene();
        
        var dice_1_result = dices_goal.dice_1;
        var dice_2_result = dices_goal.dice_2;

        var start_dice_1 = 1;
        var start_dice_2 = 1;
        var start_end_animation = 0;
        var end_dice_1 = 0;
        var end_dice_2 = 0;
        var starting_orientation_dice_1:any; 
        var starting_orientation_dice_2:any;
        var goal_orientation_dice_1:any  = [];
        var goal_orientation_dice_2:any  = [];
        var starting_rotation_speed_dice_1:any  = [];
        var starting_rotation_speed_dice_2:any  = [];
        var acceleration_dice_1:any  = [];
        var acceleration_dice_2:any   = [];
        var n_dice_1 = 0;
        var n_dice_2 = 0;
        var steps = 45.0;

        if(firstDisplayVar && displayed == 0){
            loadDices();
        }else if(n_dice_1 == 0 && displayed >= 1){
            changeOpacityMesh(textMesh, opacity_start );
            changeOpacityMesh(textMeshLost, opacity_start );
        }

        function dice_orientation(face_value:number){
            var goal_orientation:any = [];
            switch(face_value){
                case 1:
                    goal_orientation.x = 2*Math.PI/4 * 3;
                    goal_orientation.y = 2*Math.PI/4 * 2;
                    goal_orientation.z = 2*Math.PI/4 * 2;
                    break;
                case 2:
                    goal_orientation.x = 2*Math.PI/4 * 2;
                    goal_orientation.y = 2*Math.PI/4 * 0;
                    goal_orientation.z = 2*Math.PI/4 * 0;
                    break;
                case 3:
                    goal_orientation.x = 2*Math.PI/4 * 3;
                    goal_orientation.y = 2*Math.PI/4 * 3;
                    goal_orientation.z = 2*Math.PI/4 * 3;
                    break;
                case 4:
                    goal_orientation.x = 2*Math.PI/4 * 2;
                    goal_orientation.y = 2*Math.PI/4 * 1;
                    goal_orientation.z = 2*Math.PI/4 * 2;
                    break;
                case 5:
                    goal_orientation.x = 2*Math.PI/4 * 0;
                    goal_orientation.y = 2*Math.PI/4 * 0;
                    goal_orientation.z = 2*Math.PI/4 * 0;
                    break;
                case 6:
                    goal_orientation.x = 2*Math.PI/4 * 1;
                    goal_orientation.y = 2*Math.PI/4 * 2;
                    goal_orientation.z = 2*Math.PI/4 * 2;
                    break;  
            }
            return goal_orientation;

        }
        

        var animate = function () {
            if(firstDisplayVar == false){
                requestAnimationFrame( animate );
            }
                    
            if(dice_1){

                if(start_dice_1 == 1){

                    start_dice_1 = 0;
                    n_dice_1 = 0;
                    starting_orientation_dice_1 = dice_1.rotation;
                    
                    goal_orientation_dice_1 = dice_orientation(dice_1_result);
                    
                    goal_orientation_dice_1.x += 2*Math.PI;
                    goal_orientation_dice_1.y += 2*Math.PI;
                    goal_orientation_dice_1.z += 2*Math.PI;

                    
                    starting_rotation_speed_dice_1.x = Math.floor(Math.random() * 10)/100.0 + 0.02;
                    starting_rotation_speed_dice_1.y = Math.floor(Math.random() * 10)/100.0 + 0.02;
                    starting_rotation_speed_dice_1.z = Math.floor(Math.random() * 10)/100.0 + 0.02;
                    
                    acceleration_dice_1.x = ((goal_orientation_dice_1.x - starting_orientation_dice_1.x - starting_rotation_speed_dice_1.x * steps )*2) / (steps*steps);
                    acceleration_dice_1.y = ((goal_orientation_dice_1.y - starting_orientation_dice_1.y - starting_rotation_speed_dice_1.y * steps )*2) / (steps*steps);
                    acceleration_dice_1.z = ((goal_orientation_dice_1.z - starting_orientation_dice_1.z - starting_rotation_speed_dice_1.z * steps )*2) / (steps*steps);

                }

                if( n_dice_1 <= steps){

                    dice_1.rotation.x = starting_orientation_dice_1.x + starting_rotation_speed_dice_1.x * n_dice_1 + 1.0/2.0 *  (((goal_orientation_dice_1.x - starting_orientation_dice_1.x - starting_rotation_speed_dice_1.x * steps )*2) / (steps*steps)) * n_dice_1*n_dice_1;
                    dice_1.rotation.y = starting_orientation_dice_1.y + starting_rotation_speed_dice_1.y * n_dice_1 + 1.0/2.0 *  (((goal_orientation_dice_1.y - starting_orientation_dice_1.y - starting_rotation_speed_dice_1.y * steps )*2) / (steps*steps)) * n_dice_1*n_dice_1;
                    dice_1.rotation.z = starting_orientation_dice_1.z + starting_rotation_speed_dice_1.z * n_dice_1 + 1.0/2.0 *  (((goal_orientation_dice_1.z - starting_orientation_dice_1.z - starting_rotation_speed_dice_1.z * steps )*2) / (steps*steps)) * n_dice_1*n_dice_1;

                    n_dice_1 += 1;

                }else if (end_dice_1 == 0){
                    
                    dice_1.rotation.x = goal_orientation_dice_1.x;
                    dice_1.rotation.y = goal_orientation_dice_1.y;
                    dice_1.rotation.z = goal_orientation_dice_1.z; 
                    end_dice_1 = 1;
                    
                    dice_1_final_orientationVar = dice_1.rotation;
                    _set_dice_1_final_orientation(dice_1.rotation);
        
                }     
            }
            
            if(dice_2){

                if(start_dice_2 == 1){
                    start_dice_2 = 0;
                    n_dice_2 = 0;
                    
                    starting_orientation_dice_2 = dice_2.rotation;

                    goal_orientation_dice_2 = dice_orientation(dice_2_result);
                    
                    goal_orientation_dice_2.x += 2*Math.PI;
                    goal_orientation_dice_2.y += 2*Math.PI;
                    goal_orientation_dice_2.z += 2*Math.PI;

                    starting_rotation_speed_dice_2.x = Math.floor(Math.random() * 10)/100.0 + 0.02;
                    starting_rotation_speed_dice_2.y = Math.floor(Math.random() * 10)/100.0 + 0.02;
                    starting_rotation_speed_dice_2.z = Math.floor(Math.random() * 10)/100.0 + 0.02;


                    acceleration_dice_2.x = ((goal_orientation_dice_2.x - starting_orientation_dice_2.x - starting_rotation_speed_dice_2.x * steps )*2) / (steps*steps);
                    acceleration_dice_2.y = ((goal_orientation_dice_2.y - starting_orientation_dice_2.y - starting_rotation_speed_dice_2.y * steps )*2) / (steps*steps);
                    acceleration_dice_2.z = ((goal_orientation_dice_2.z - starting_orientation_dice_2.z - starting_rotation_speed_dice_2.z * steps )*2) / (steps*steps);

                }

                if( n_dice_2 <= steps ){
                    
                    dice_2.rotation.x = starting_orientation_dice_2.x + starting_rotation_speed_dice_2.x * n_dice_2 + 1.0/2.0 *  (((goal_orientation_dice_2.x - starting_orientation_dice_2.x - starting_rotation_speed_dice_2.x * steps )*2) / (steps*steps)) * n_dice_2*n_dice_2;
                    dice_2.rotation.y = starting_orientation_dice_2.y + starting_rotation_speed_dice_2.y * n_dice_2 + 1.0/2.0 *  (((goal_orientation_dice_2.y - starting_orientation_dice_2.y - starting_rotation_speed_dice_2.y * steps )*2) / (steps*steps)) * n_dice_2*n_dice_2;
                    dice_2.rotation.z = starting_orientation_dice_2.z + starting_rotation_speed_dice_2.z * n_dice_2 + 1.0/2.0 *  (((goal_orientation_dice_2.z - starting_orientation_dice_2.z - starting_rotation_speed_dice_2.z * steps )*2) / (steps*steps)) * n_dice_2*n_dice_2;

                    n_dice_2 += 1;

                }else if (end_dice_2 == 0){
                    
                    dice_2.rotation.x = goal_orientation_dice_2.x;
                    dice_2.rotation.y = goal_orientation_dice_2.y;
                    dice_2.rotation.z = goal_orientation_dice_2.z; 
                    end_dice_2 = 1;

                    dice_2_final_orientationVar = dice_2.rotation;
                    _set_dice_2_final_orientation(dice_2.rotation);
                    start_end_animation = 1;
                    
                }     
            }

            if(start_end_animation){

                if(dice_1_result + dice_2_result == 7){
                    changeOpacityMesh(textMesh, (opacity_end-opacity_start)/opacity_change_frames * frame_n );
                    changeOpacityMesh(textMeshLost, opacity_start );

                }else{
                    changeOpacityMesh(textMeshLost, (opacity_end-opacity_start)/opacity_change_frames * frame_n );
                    changeOpacityMesh(textMesh, opacity_start );
                }
                
                frame_n ++;
                if(frame_n == opacity_change_frames){
                    start_end_animation = 0; 
                }

            }

            renderer.render( scene, camera );
        }

        renderer.shadowMap.enabled = true
        renderer.setSize( width, height );
        renderer.setClearColor( 0xffffff, 0);
        
        camera.updateProjectionMatrix();
        if(firstDisplayVar){
            renderer.render( scene, camera );
            firstDisplayVar = false;
            _setFirstDisplay(false);
            dispatch(increment());
        }else if(dices_goal.playing_bool == true){
            
            animate();
            setPlayingBool(false);
        }


    }, [dices_goal.dice_1, dices_goal.dice_2]);

    return (
        <div ref={refContainer}></div>

    );

}

export default dices