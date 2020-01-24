/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Anim component for A-Frame.
 */
AFRAME.registerComponent('anim', {
    schema: {
        amount: {
            type: 'number',
            default: 10
        },
        color: {
            type: 'color',
            default: 'red'
        },
        duration: {
            type: 'number',
            default: 10000
        },
        randScaleMax: {
            type: 'number',
            default: 3
        },
    },
    //custom function
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },

    getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        for (let i = 1; i < this.data.amount; i++) {
            let s = this.getRandomInt(1, this.data.randScaleMax) * .20;
            let box = document.createElement('a-gltf-model');
            box.setAttribute('src', './models/NewTieFighter.gltf');
            box.setAttribute('color', this.getRandomColor());
            box.setAttribute('position', this.getRandomInt(-30, -58) + ' ' + this.getRandomInt(-
                8, 30) + ' ' + this.getRandomInt(-25, -1));
            box.setAttribute('scale', s + ' ' + s + ' ' + s);
            box.setAttribute('rotation', '0 0 ' + this.getRandomInt(-180, 180));
            box.setAttribute('radius', i);
            box.setAttribute('metalness', 1);
            box.setAttribute('flatShading', 0);

            box.setAttribute('animation__rot', {
                property: 'rotation',
                dir: 'alternate',
                dur: 10000,
                to: this.getRandomInt(0, 360) + ' ' + this.getRandomInt(0, 360) + ' ' +
                    this.getRandomInt(0, 360),
                easing: 'easeInSine',
                loop: true
            });

            box.setAttribute('animation__pos', {
                property: 'position',
                dir: 'alternate',
                dur: 10000,
                to: this.getRandomInt(-50, -58) + ' ' + this.getRandomInt(-
                    8, 30) + ' ' + this.getRandomInt(-50, -50),
                easing: 'easeInSine',
                loop: true
            });

            box.setAttribute('animation__scale', {
                property: 'scale',
                dir: 'alternate',
                dur: 10000,
                to: s + ' ' + s + ' ' + s,
                easing: 'easeInSine',
                loop: true
            });
            this.el.appendChild(box);
        }
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) {},

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function () {},

    /**
     * Called on each scene tick.
     */
    // tick: function (t) { },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause: function () {},

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play: function () {}
});