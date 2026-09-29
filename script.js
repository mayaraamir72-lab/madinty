/* ==========================================
   NAVBAR
========================================== */

const navbar = document.getElementById("navbar");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("open");

});


document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

    });

});



/* ==========================================
   SCROLL ANIMATION
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: .15
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});



/* ==========================================
   IMAGE LIGHTBOX
========================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


function openImage(element) {

    const image =
        element.querySelector("img");

    lightboxImage.src =
        image.src;

    lightbox.classList.add("active");

}


function closeImage() {

    lightbox.classList.remove("active");

    lightboxImage.src = "";

}


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeImage();

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeImage();

    }

});



/* ==========================================
   CONTACT FORM
========================================== */

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    formMessage.innerText =
        `Thank you ${name}! Your inquiry has been received in this demo.`;

    form.reset();

});



/* ==========================================
   THREE.JS 3D CITY
========================================== */

const canvas =
    document.getElementById("cityCanvas");


const scene =
    new THREE.Scene();


/* Camera */

const camera =
    new THREE.PerspectiveCamera(

        45,

        canvas.clientWidth /
        canvas.clientHeight,

        .1,

        1000

    );


camera.position.set(
    35,
    30,
    35
);



/* Renderer */

const renderer =
    new THREE.WebGLRenderer({

        canvas:
            canvas,

        antialias:
            true

    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight,
    false
);


renderer.shadowMap.enabled =
    true;



/* ==========================================
   LIGHT
========================================== */

const ambientLight =
    new THREE.HemisphereLight(

        0xffffff,
        0x38533f,
        2

    );


scene.add(
    ambientLight
);


const sun =
    new THREE.DirectionalLight(

        0xffffff,
        3

    );


sun.position.set(
    30,
    50,
    20
);


sun.castShadow =
    true;


scene.add(
    sun
);



/* ==========================================
   CITY GROUP
========================================== */

const city =
    new THREE.Group();


scene.add(
    city
);



/* ==========================================
   GROUND
========================================== */

const groundGeometry =
    new THREE.PlaneGeometry(
        90,
        90
    );


const groundMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x829879

    });


const ground =
    new THREE.Mesh(

        groundGeometry,

        groundMaterial

    );


ground.rotation.x =
    -Math.PI / 2;


ground.receiveShadow =
    true;


city.add(
    ground
);



/* ==========================================
   ROADS
========================================== */

function createRoad(
    x,
    z,
    width,
    depth
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            .15,
            depth
        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x3d4740

        });


    const road =
        new THREE.Mesh(
            geometry,
            material
        );


    road.position.set(
        x,
        .08,
        z
    );


    city.add(
        road
    );

}


createRoad(
    0,
    0,
    85,
    5
);


createRoad(
    0,
    0,
    5,
    85
);


createRoad(
    0,
    18,
    70,
    3
);


createRoad(
    -18,
    0,
    3,
    70
);



/* ==========================================
   LAKE
========================================== */

const lakeGeometry =
    new THREE.BoxGeometry(
        25,
        .15,
        12
    );


const lakeMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x3d7e85,

        roughness:
            .2

    });


const lake =
    new THREE.Mesh(

        lakeGeometry,

        lakeMaterial

    );


lake.position.set(
    20,
    .15,
    -23
);


city.add(
    lake
);



/* ==========================================
   BUILDINGS
========================================== */

function createBuilding(
    x,
    z,
    width,
    depth,
    height
) {

    const group =
        new THREE.Group();


    /* Building */

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0xd4c5a8

        });


    const building =
        new THREE.Mesh(
            geometry,
            material
        );


    building.position.y =
        height / 2;


    building.castShadow =
        true;


    group.add(
        building
    );


    /* Roof */

    const roofGeometry =
        new THREE.ConeGeometry(
            Math.max(width, depth) * .7,
            1.5,
            4
        );


    const roofMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x95694c

        });


    const roof =
        new THREE.Mesh(

            roofGeometry,

            roofMaterial

        );


    roof.position.y =
        height + .7;


    roof.rotation.y =
        Math.PI / 4;


    group.add(
        roof
    );


    /* Windows */

    const windowMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x669397

        });


    const floors =
        Math.floor(
            height / 2
        );


    for (
        let floor = 0;
        floor < floors;
        floor++
    ) {

        for (
            let column = 0;
            column < 3;
            column++
        ) {

            const windowGeometry =
                new THREE.BoxGeometry(
                    .6,
                    .45,
                    .05
                );


            const window =
                new THREE.Mesh(

                    windowGeometry,

                    windowMaterial

                );


            window.position.set(

                (column - 1) *
                (width / 3),

                1.3 +
                floor * 2,

                depth / 2 + .03

            );


            group.add(
                window
            );

        }

    }


    group.position.set(
        x,
        0,
        z
    );


    city.add(
        group
    );

}



/* Buildings */

const buildings = [

    [-30,-28,5,5,9],
    [-20,-29,5,5,12],
    [-10,-28,5,5,8],

    [5,-28,5,5,11],
    [15,-29,5,5,9],

    [-30,-8,5,5,10],
    [-22,-7,5,5,13],

    [-10,-7,5,5,9],
    [0,-7,5,5,12],

    [10,-7,5,5,10],
    [29,-8,5,5,11],

    [-30,9,5,5,9],
    [-21,9,5,5,12],

    [8,9,5,5,11],
    [18,8,5,5,9],
    [29,9,5,5,12],

    [-30,29,5,5,10],
    [-20,29,5,5,8],

    [-9,28,5,5,11],
    [2,29,5,5,9],
    [13,29,5,5,12],
    [29,28,5,5,10]

];


buildings.forEach(function (building) {

    createBuilding(
        ...building
    );

});



/* ==========================================
   TREES
========================================== */

function createTree() {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .12,
                .16,
                1.3,
                7
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x604936

            })

        );


    trunk.position.y =
        .65;


    tree.add(
        trunk
    );


    const leaves =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .7,
                10,
                10
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x315c3a

            })

        );


    leaves.position.y =
        1.5;


    tree.add(
        leaves
    );


    return tree;

}



function createPark(
    x,
    z,
    width,
    depth
) {

    const park =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                .15,
                depth
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x4f754e

            })

        );


    park.position.set(
        x,
        .12,
        z
    );


    city.add(
        park
    );


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const tree =
            createTree();


        tree.position.set(

            x +
            (Math.random()-.5) *
            width,

            0,

            z +
            (Math.random()-.5) *
            depth

        );


        city.add(
            tree
        );

    }

}


createPark(
    -20,
    20,
    22,
    17
);


createPark(
    18,
    18,
    20,
    16
);


createPark(
    -20,
    -18,
    20,
    15
);



/* ==========================================
   CENTRAL LANDMARK
========================================== */

const tower =
    new THREE.Mesh(

        new THREE.CylinderGeometry(
            2.5,
            3.3,
            10,
            8
        ),

        new THREE.MeshStandardMaterial({

            color:
                0xe2d4b9

        })

    );


tower.position.y =
    5;


city.add(
    tower
);


const towerRoof =
    new THREE.Mesh(

        new THREE.ConeGeometry(
            3.5,
            3,
            8
        ),

        new THREE.MeshStandardMaterial({

            color:
                0x95694c

        })

    );


towerRoof.position.y =
    11.5;


city.add(
    towerRoof
);



/* ==========================================
   ORBIT CONTROLS
========================================== */

let controls;


if (
    typeof THREE.OrbitControls !==
    "undefined"
) {

    controls =
        new THREE.OrbitControls(

            camera,

            renderer.domElement

        );


    controls.enableDamping =
        true;


    controls.dampingFactor =
        .06;


    controls.minDistance =
        20;


    controls.maxDistance =
        75;


    controls.maxPolarAngle =
        Math.PI / 2.05;


    controls.target.set(
        0,
        3,
        0
    );

}



/* ==========================================
   DAY / NIGHT
========================================== */

function dayMode() {

    scene.background.set(
        0x8fb7b0
    );

    ground.material.color.set(
        0x829879
    );

    ambientLight.intensity =
        2;

    sun.intensity =
        3;

}


function nightMode() {

    scene.background.set(
        0x07140f
    );

    ground.material.color.set(
        0x17291e
    );

    ambientLight.intensity =
        .4;

    sun.intensity =
        .4;

}


function resetCamera() {

    camera.position.set(
        35,
        30,
        35
    );

    if (controls) {

        controls.target.set(
            0,
            3,
            0
        );

    }

    dayMode();

}



/* ==========================================
   RESPONSIVE 3D
========================================== */

function resizeThree() {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height,
        false
    );

}


window.addEventListener(
    "resize",
    resizeThree
);



/* ==========================================
   ANIMATION LOOP
========================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    /* Slow city rotation */

    city.rotation.y +=
        .0005;


    if (controls) {

        controls.update();

    }


    renderer.render(
        scene,
        camera
    );
}


animate()