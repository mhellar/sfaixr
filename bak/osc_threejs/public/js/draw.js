// once everything is loaded, we run our Three.js stuff.
$(function () {

    var stats = initStats();
    var x, y, z;
    x = 4;
    y = 4;
    z = 4;

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);


    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    // // create the ground plane
    // var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    // var planeMaterial = new THREE.MeshLambertMaterial({
    //     color: 0xffffff
    // });
    // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.receiveShadow = true;

    // // rotate and position the plane
    // plane.rotation.x = -0.5 * Math.PI;
    // plane.position.x = 15
    // plane.position.y = 0
    // plane.position.z = 0

    // // add the plane to the scene
    // scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.CubeGeometry(x, y, z);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: getRandomColor()
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.dynamic = true;

    // add the cube to the scene
    // scene.add(cube);

    var sphereGeometry = new THREE.IcosahedronGeometry(100, 0);

    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: getRandomColor()
    });

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.dynamic = true;

    // add the sphere to the scene
    // scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);

    // call the render function
    var step = 0;
    render();

    function render() {

        z = rot;
        x = incoming;
        y = scale;

        // sphereMaterial = new THREE.MeshLambertMaterial({
        //     color: getRandomColor()
        // });

        sphereMaterial = new THREE.MeshPhongMaterial({
            color: getRandomColor(),
            shading: THREE.FlatShading
        });
        var sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereGeometry = new THREE.SphereGeometry(x * Math.PI * .7, y * Math.PI * .7, z * Math.PI * .7);
        // position the sphere
        sphere1.position.x = x;
        sphere1.position.y = y;
        sphere1.position.z = z;
        // sphere1.rotation.x = x;
        // sphere1.rotation.y = y;
        // sphere1.rotation.z = z;


        // rotate the cube around its axes
        sphere1.rotation.x = x * Math.PI * 2;
        sphere1.rotation.y = y * Math.PI * 2;
        sphere1.rotation.z = z * Math.PI * 2;


        sphere1.scale.set(x / 600, y / 600, z / 600);

        sphere1.dynamic = true;
        sphere1.verticesNeedUpdate = true;

        // add the sphere1 to the scene
        scene.add(sphere1);

        stats.update();
        cube.geometry.verticesNeedUpdate = true;
        sphere.geometry.verticesNeedUpdate = true;

        // cube.scale.set(scale, scale, scale);

        // render using requestAnimationFrame
        requestAnimationFrame(render);

        renderer.render(scene, camera);
    }

    function initStats() {

        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        $("#Stats-output").append(stats.domElement);

        return stats;
    }
});