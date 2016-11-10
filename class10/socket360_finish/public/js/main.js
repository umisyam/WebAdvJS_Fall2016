var app = app || {};

app.main = (function() {
    var socket;
    var animate,
        mobile, container, camera, scene, renderer, controls, group, texture, dome, domeGeom, domeMaterial,
        index = 0,
        frameDelta = 0,
        clock = new THREE.Clock(),
        loadedtex = [],
        users = [],
        imglength = 94,
        yourId;

    var socketSetup = function(callback) {
        socket = io.connect();
        socket.on('add-u', function(data) {
            console.log(data);
            yourId = data;
        });

        socket.on('add-sb', function(data) {
            if (data[1] != yourId) {
                addUser(data.geom, data.pos, data.color, data.id, false);
            }
        });

        socket.on('remove', function(data) {
            removeUser(data);
        });

        callback();
    };

    var transition = function() {
        setTimeout(function() {
            $("#loading").fadeOut(500);
            $("#container").fadeIn(1500);
            $("#options").fadeIn(1000);
            animate();
        }, 500);
    }

    var addDomeImg = function() {
        var textureloaded = 0;
        var texture_loader = new THREE.TextureLoader();
        var load_textures = function() {
            if (textureloaded == imglength) {
                domeMaterial = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0x050505,
                    shininess: 50,
                    map: loadedtex[0],
                    side: THREE.BackSide
                });
                domeMaterial.map.needsUpdate = true;
                domeGeom = new THREE.SphereGeometry(200, 200, 200);
                vertexUv();
                dome = new THREE.Mesh(domeGeom, domeMaterial);
                dome.rotation.x = Math.PI / 2;
                group.add(dome);
                transition();
            } else {
                var texture = 'texture/sky' + textureloaded + '.jpg';
                texture_loader.load(texture, function(tex) {
                    loadedtex[textureloaded] = tex;
                    textureloaded += 1;
                    load_textures();
                })
            }
        }
        load_textures();
    }

    var vertexUv = function() {
        var faceVertexUvs = domeGeom.faceVertexUvs[0];
        for (var i = 0; i < faceVertexUvs.length; i++) {
            var uvs = faceVertexUvs[i];
            var face = domeGeom.faces[i];
            for (var j = 0; j < 3; j++) {
                uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
                uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
            }
        }
    }

    var addLights = function() {
        var ambientLight = new THREE.AmbientLight(0xdddddd);
        group.add(ambientLight);

        var lights = [];
        lights[0] = new THREE.PointLight(0xcccccc, 1, 100);
        lights[1] = new THREE.PointLight(0xcccccc, 1, 300);
        lights[2] = new THREE.PointLight(0xcccccc, 1, 300);
        lights[3] = new THREE.PointLight(0xcccccc, 1, 300);
        lights[4] = new THREE.PointLight(0xcccccc, 1, 300);

        lights[0].position.set(0, 70, 0);
        lights[1].position.set(80, 0, 80);
        lights[2].position.set(-80, 0, -80);
        lights[3].position.set(80, 0, -80);
        lights[4].position.set(-80, 0, 80);

        group.add(lights[0]);
        group.add(lights[1]);
        group.add(lights[2]);
        group.add(lights[3]);
        group.add(lights[4]);
    }

    var geomConstructor = function(geom, color) {
        console.log("rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")");
        colorstr = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
        var ballMat = new THREE.MeshPhongMaterial({
                color: colorstr,
                shininess: 50,
                side: THREE.FrontSide
            }),
            ballGeom;

        switch (geom) {
            case "sphere":
                ballGeom = new THREE.SphereGeometry(10, 10, 10);
                break;
            case "box":
                ballGeom = new THREE.BoxGeometry(10, 10, 10);
                break;
            case "cylinder":
                ballGeom = new THREE.CylinderGeometry(10, 10, 15);
                break;
            case "torus":
                ballGeom = new THREE.TorusGeometry(10, 5, 20, 20);
                break;
        }
        return new THREE.Mesh(ballGeom, ballMat);
    }

    var addUser = function(geom, pos, color, id, me) {
        // removeUser(id);
        if (me) {
            socket.emit('add-user', {
                geom: geom,
                color: color,
                pos: [pos[0], pos[1], pos[2]]
            });
        }
        console.log(color);
        var object = geomConstructor(geom, color);
        object.name = id;
        object.position.set(pos[0], pos[1], pos[2]);
        scene.add(object);
    }

    var removeUser = function(id) {
        var obj = scene.getObjectByName(id);
        scene.remove(obj);
    }

    var mobilecheck = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                check = true;
            }
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };


    var animate = function() {
        var delta = clock.getDelta();
        frameDelta += delta;
        if (frameDelta >= delta * 4) {
            frameDelta = 0;
            index++;
            if (index >= imglength) {
                index = 0;
            }
            dome.material.map = loadedtex[index];
            dome.material.needsUpdate = true;
        }
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    var threeJSSetup = function() {
        mobile = mobilecheck();
        container = $("#container");
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        scene = new THREE.Scene();
        if (mobile) {
            camera.position.z = 0;
            camera.position.y = 70;
            controls = new THREE.DeviceOrientationControls(camera);
        } else {
            camera.position.set(57, 120, 120);
            controls = new THREE.OrbitControls(camera);
            controls.enablePan = true;
            var axishelper = new THREE.AxisHelper(1000);
            scene.add(axishelper);
        }
        controls.target = new THREE.Vector3(0, 1, 0);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.append(renderer.domElement);

        group = new THREE.Object3D();
        addLights();
        scene.add(group);
        addDomeImg();
        socketSetup(attachEvents);
    }

    var attachEvents = function() {
        $('#options button').click(function(e) {
            var geom = e.target.id,
                pos = [],
                color = [];
            for (var i = 0; i < 3; i++) {
                pos[i] = Math.floor(Math.floor(Math.random() * (100 - (-100) + 1)) - 100);
                color[i] = Math.floor(Math.random() * 255);
            };
            addUser(geom, pos, color, yourId, true);
        });

        $(window).resize(function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    var init = function() {
        threeJSSetup();
    };

    return {
        init: init
    };

})();

$(document).ready(app.main.init);
