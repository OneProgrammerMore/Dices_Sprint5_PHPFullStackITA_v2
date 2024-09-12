import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useRef } from "react";

function dices_background() {

    const refContainer:any = useRef(null);
   
    
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        var canvasRef = document.getElementById('dices-background')!;
        const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvasRef});

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000001, 0.9);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; 


        //Create a DirectionalLight and turn on shadows for the light
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
        scene.add( ambientLight );

        //Create a DirectionalLight and turn on shadows for the light
        const light = new THREE.DirectionalLight( 0xffffff, 10 );
        light.position.set( 0, 10, 70 ); //default; light shining from top
        light.castShadow = true; // default false
        scene.add( light );


        //Create a DirectionalLight and turn on shadows for the light
        const light2 = new THREE.DirectionalLight( 0xffffff, 10 );
        light2.position.set( 0, -10, 70 ); //default; light shining from top
        light2.castShadow = true; // default false
        scene.add( light2 );


        //Create a DirectionalLight and turn on shadows for the light
        const light3 = new THREE.DirectionalLight( 0xffffff, 10 );
        light3.position.set( 0, 20, 70 ); //default; light shining from top
        light3.castShadow = true; // default false
        scene.add( light3 );

        //Create a DirectionalLight and turn on shadows for the light
        const lightLeft = new THREE.DirectionalLight( 0xffffff, 10 );
        lightLeft.position.set( 30, 20, 70 ); //default; light shining from top
        lightLeft.castShadow = true; // default false
        scene.add( lightLeft );
        const lightRight = new THREE.DirectionalLight( 0xffffff, 10 );
        lightRight.position.set( -30, 20, 70 ); //default; light shining from top
        lightRight.castShadow = true; // default false
        scene.add( lightRight );

        //Set up shadow properties for the light
        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 500; // default


        const loader = new GLTFLoader();


        var amount_dices = 7;
        var dices:any= [];

        for (let i = 0; i < amount_dices; i++) {

            loader.load( '/DiceRoundColouredGray.gltf', function ( gltf ) {


                gltf.scene.scale.set(30, 30, 30);
            
                dices.push(gltf.scene);
                dices[i].castShadow = true; 
                dices[i].receiveShadow = false;
                
                dices[i].position.y = Math.floor(Math.random() * 10) + 15;
                dices[i].position.x = Math.floor(Math.random() * 20)-10;
                dices[i].position.z = Math.floor(Math.random() * 1);

                dices[i].position.set(dices[i].position.x, dices[i].position.y , dices[i].position.z);
                
                scene.add(dices[i]);
                
                dices[i].x_rotation = Math.floor(Math.random() * 100)/1000; 
                dices[i].y_rotation = Math.floor(Math.random() * 100)/1000; 

                dices[i].y_speed = Math.floor(Math.random() * 10)/100 + 0.01; 

            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );

        }


        camera.position.z = 5;

        var animate = function () {

            renderer.render( scene, camera );

            for (let i = 0; i < amount_dices; i++) {
                if(dices[i]){
                    dices[i].rotation.x += dices[i].x_rotation ;
                    dices[i].rotation.y += dices[i].y_rotation ;
                    dices[i].position.y -= dices[i].y_speed ;

                    if(dices[i].position.y < -5){
                        dices[i].position.y = Math.floor(Math.random() * 10) + 15;
                        dices[i].position.x = Math.floor(Math.random() * 20)-10;
                        dices[i].position.z = Math.floor(Math.random() * 1);

                        dices[i].x_rotation = Math.floor(Math.random() * 100)/1000 + 0.01; 
                        dices[i].y_rotation = Math.floor(Math.random() * 100)/1000 + 0.01; 
                        dices[i].y_speed = Math.floor(Math.random() * 10)/100 + 0.01;

                    }

                }
            }

        }

        renderer.setAnimationLoop( animate );

        window.addEventListener( 'resize', onWindowResize, false );

        function onWindowResize(){

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );

        }


    }, []);
    return (
      <div ref={refContainer}></div>
  
    );

}



export default dices_background
