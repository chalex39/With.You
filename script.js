/* ==================================================
   SECTION 1: YOUR CUSTOM MESSAGES
   ================================================== */

const messages = [

    "You are doing better than you think.",

    "I'm proud of you.",

    "You deserve a little break.",

    "Take a deep breath. You've got this.",

    "You are more capable than you realize.",

    "You are enough.",

    "Someone is always rooting for you.",

    "You make the world a little brighter.",

    "It's okay to take things one step at a time.",

    "I hope today is gentle with you."

];


/* ==================================================
   SECTION 2: FIND WEBSITE ELEMENTS
   ================================================== */

const messageElement =
    document.getElementById("message");

const squishy =
    document.getElementById("squishy");

const instruction =
    document.getElementById("instruction");

const heartButton =
    document.getElementById("heartButton");

const messageOverlay =
    document.getElementById("messageOverlay");

const closeButton =
    document.getElementById("closeButton");


/* ==================================================
   SECTION 3: RANDOM INITIAL MESSAGE
   ================================================== */

const randomIndex =
    Math.floor(
        Math.random() * messages.length
    );

messageElement.textContent =
    messages[randomIndex];


/* ==================================================
   SECTION 4: PASTEL COLOR PALETTE
   ==================================================

   Color path:

   PINK
      ↓
   PURPLE
      ↓
   BLUE
      ↓
   YELLOW
      ↓
   GREEN
      ↓
   PINK

   The colors are intentionally pastel.
   ================================================== */

const pastelColors = [

    {
        name: "pink",

        background: "#fff1f5",

        glow: "#ffe3eb",

        light: "#fff8fa",

        main: "#f5c6d5",

        dark: "#e5a6b9"
    },


    {
        name: "purple",

        background: "#f5f0fb",

        glow: "#e9def7",

        light: "#fbf9ff",

        main: "#d7c6ec",

        dark: "#bda5d8"
    },


    {
        name: "blue",

        background: "#edf6fc",

        glow: "#dceefa",

        light: "#f8fcff",

        main: "#c4dced",

        dark: "#a3c7df"
    },


    {
        name: "yellow",

        background: "#fff9e9",

        glow: "#fff1c9",

        light: "#fffdf6",

        main: "#f3dfaa",

        dark: "#ddc57f"
    },


    {
        name: "green",

        background: "#eef9f1",

        glow: "#dcefe1",

        light: "#f9fff9",

        main: "#c5e2cb",

        dark: "#a5caaa"
    }

];


/* ==================================================
   SECTION 5: COLOR CONVERSION
   ================================================== */

function hexToRgb(hex) {

    const cleanHex =
        hex.replace("#", "");

    return {

        r:
            parseInt(
                cleanHex.substring(0, 2),
                16
            ),

        g:
            parseInt(
                cleanHex.substring(2, 4),
                16
            ),

        b:
            parseInt(
                cleanHex.substring(4, 6),
                16
            )

    };

}


/* ==================================================
   SECTION 6: RGB TO HEX
   ================================================== */

function rgbToHex(r, g, b) {

    return "#" +

        [r, g, b]
            .map(
                value => {

                    return Math
                        .round(value)
                        .toString(16)
                        .padStart(2, "0");

                }
            )
            .join("");

}


/* ==================================================
   SECTION 7: SMOOTH COLOR INTERPOLATION
   ================================================== */

function interpolateColor(
    color1,
    color2,
    amount
) {

    const first =
        hexToRgb(color1);

    const second =
        hexToRgb(color2);

    const r =
        first.r +
        (second.r - first.r)
        * amount;

    const g =
        first.g +
        (second.g - first.g)
        * amount;

    const b =
        first.b +
        (second.b - first.b)
        * amount;

    return rgbToHex(
        r,
        g,
        b
    );

}


/* ==================================================
   SECTION 8: COLOR PROGRESS
   ================================================== */

/*
   The current color and target color are separated.

   This allows the color to smoothly follow the user's
   movement without instantly jumping.
*/

let colorProgress = 0;

let targetColorProgress = 0;


/* ==================================================
   SECTION 9: APPLY COLORS
   ================================================== */

function updateColors(progress) {

    const paletteLength =
        pastelColors.length;


    const normalized =
        (
            (progress % paletteLength)
            + paletteLength
        )
        % paletteLength;


    const firstIndex =
        Math.floor(normalized);


    const secondIndex =
        (firstIndex + 1)
        % paletteLength;


    const blend =
        normalized -
        firstIndex;


    const first =
        pastelColors[firstIndex];

    const second =
        pastelColors[secondIndex];


    const background =
        interpolateColor(
            first.background,
            second.background,
            blend
        );


    const glow =
        interpolateColor(
            first.glow,
            second.glow,
            blend
        );


    const light =
        interpolateColor(
            first.light,
            second.light,
            blend
        );


    const main =
        interpolateColor(
            first.main,
            second.main,
            blend
        );


    const dark =
        interpolateColor(
            first.dark,
            second.dark,
            blend
        );


    /*
       Update CSS variables.
    */

    document.documentElement.style
        .setProperty(
            "--background-color",
            background
        );


    document.documentElement.style
        .setProperty(
            "--background-glow",
            glow
        );


    document.documentElement.style
        .setProperty(
            "--squishy-light",
            light
        );


    document.documentElement.style
        .setProperty(
            "--squishy-main",
            main
        );


    document.documentElement.style
        .setProperty(
            "--squishy-dark",
            dark
        );


    /*
       Squishy glow.
    */

    const rgb =
        hexToRgb(main);


    document.documentElement.style
        .setProperty(
            "--squishy-glow",
            `rgba(
                ${rgb.r},
                ${rgb.g},
                ${rgb.b},
                0.28
            )`
        );

}


/* ==================================================
   SECTION 10: COLOR ANIMATION
   ==================================================

   IMPORTANT CHANGE:

   This is significantly faster than the previous
   version.

   The color follows the person's interaction much
   more quickly.
   ================================================== */

function animateColors() {

    colorProgress +=
        (
            targetColorProgress -
            colorProgress
        ) * 0.075;


    updateColors(
        colorProgress
    );


    requestAnimationFrame(
        animateColors
    );

}


animateColors();


/* ==================================================
   SECTION 11: SQUISHY PHYSICS
   ================================================== */

let currentX = 0;

let currentY = 0;

let targetX = 0;

let targetY = 0;

let currentScaleX = 1;

let currentScaleY = 1;

let targetScaleX = 1;

let targetScaleY = 1;

let rotation = 0;

let targetRotation = 0;

let touching = false;

let lastPointerX = null;

let lastPointerY = null;


/* ==================================================
   SECTION 12: SQUISHY SPRING ANIMATION
   ================================================== */

function animateSquishy() {

    currentX +=
        (
            targetX -
            currentX
        ) * 0.16;


    currentY +=
        (
            targetY -
            currentY
        ) * 0.16;


    currentScaleX +=
        (
            targetScaleX -
            currentScaleX
        ) * 0.13;


    currentScaleY +=
        (
            targetScaleY -
            currentScaleY
        ) * 0.13;


    rotation +=
        (
            targetRotation -
            rotation
        ) * 0.13;


    squishy.style.transform = `

        translate3d(
            ${currentX}px,
            ${currentY}px,
            0
        )

        scale(
            ${currentScaleX},
            ${currentScaleY}
        )

        rotate(
            ${rotation}deg
        )

    `;


    requestAnimationFrame(
        animateSquishy
    );

}


animateSquishy();


/* ==================================================
   SECTION 13: PRESS DOWN
   ================================================== */

squishy.addEventListener(
    "pointerdown",
    function(event) {

        touching = true;

        squishy.classList.add(
            "is-touching"
        );


        event.preventDefault();


        squishy.setPointerCapture(
            event.pointerId
        );


        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;


        /*
           IMPORTANT:

           The color begins changing immediately
           when the user presses down.

           This is much stronger than the previous
           tiny 0.008 movement.
        */

        targetColorProgress +=
            0.035;


        instruction.textContent =
            "keep playing ♡";

    }
);


/* ==================================================
   SECTION 14: MOVEMENT
   ================================================== */

squishy.addEventListener(
    "pointermove",
    function(event) {

        if (!touching) {
            return;
        }


        /*
           Calculate actual finger movement.
        */

        const movementX =
            event.clientX -
            lastPointerX;


        const movementY =
            event.clientY -
            lastPointerY;


        const movementDistance =
            Math.sqrt(
                movementX * movementX +
                movementY * movementY
            );


        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;


        /* ==========================================
           COLOR CHANGE

           This is the main adjustment.

           Previously, the color changed very slowly.

           Now every movement produces a visible
           amount of color progression.

           Even small movements count.
           ========================================== */

        const colorChange =
            0.012 +
            movementDistance * 0.0025;


        targetColorProgress +=
            colorChange;


        /*
           Prevent the target from getting too far
           ahead of the visible color.
        */

        const maximumLead =
            colorProgress + 0.18;


        if (
            targetColorProgress >
            maximumLead
        ) {

            targetColorProgress =
                maximumLead;

        }


        /* ==========================================
           SQUISHY POSITION
           ========================================== */

        const rect =
            squishy.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        let distanceX =
            event.clientX -
            centerX;


        let distanceY =
            event.clientY -
            centerY;


        const maximumDistance =
            65;


        distanceX =
            Math.max(
                -maximumDistance,
                Math.min(
                    maximumDistance,
                    distanceX
                )
            );


        distanceY =
            Math.max(
                -maximumDistance,
                Math.min(
                    maximumDistance,
                    distanceY
                )
            );


        targetX =
            distanceX * 0.28;


        targetY =
            distanceY * 0.28;


        /* ==========================================
           STRETCH
           ========================================== */

        const horizontalStretch =
            Math.abs(distanceX)
            / maximumDistance;


        const verticalStretch =
            Math.abs(distanceY)
            / maximumDistance;


        targetScaleX =
            1 +
            horizontalStretch * 0.18 -
            verticalStretch * 0.08;


        targetScaleY =
            1 +
            verticalStretch * 0.18 -
            horizontalStretch * 0.08;


        /* ==========================================
           ROTATION
           ========================================== */

        targetRotation =
            distanceX * 0.08;

    }
);


/* ==================================================
   SECTION 15: RELEASE
   ==================================================

   IMPORTANT:

   There is NO COLOR CHANGE here.

   Color only changes while the person is actually
   pressing / interacting with the squishy.
   ================================================== */

function releaseSquishy() {

    touching = false;

    squishy.classList.remove(
        "is-touching"
    );


    /*
       Return the squishy to its natural shape.
    */

    targetX = 0;

    targetY = 0;

    targetScaleX = 1;

    targetScaleY = 1;

    targetRotation = 0;


    instruction.textContent =
        "press & move me";

}


squishy.addEventListener(
    "pointerup",
    releaseSquishy
);


squishy.addEventListener(
    "pointercancel",
    releaseSquishy
);


squishy.addEventListener(
    "lostpointercapture",
    function() {

        if (touching) {

            releaseSquishy();

        }

    }
);


/* ==================================================
   SECTION 16: CLICK FOR A NEW MESSAGE
   ================================================== */

squishy.addEventListener(
    "click",
    function() {

        const newIndex =
            Math.floor(
                Math.random() *
                messages.length
            );


        messageElement.style.opacity =
            "0";


        setTimeout(
            function() {

                messageElement.textContent =
                    messages[newIndex];

                messageElement.style.opacity =
                    "1";

            },
            180
        );

    }
);


/* ==================================================
   SECTION 17: MESSAGE TRANSITION
   ================================================== */

messageElement.style.transition =
    "opacity 0.18s ease";


/* ==================================================
   SECTION 18: HEART BUTTON
   ================================================== */

heartButton.addEventListener(
    "click",
    function() {

        messageOverlay.classList.add(
            "open"
        );

        messageOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* ==================================================
   SECTION 19: CLOSE MESSAGE
   ================================================== */

function closeMessage() {

    messageOverlay.classList.remove(
        "open"
    );

    messageOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


closeButton.addEventListener(
    "click",
    closeMessage
);


/* ==================================================
   SECTION 20: TAP OUTSIDE TO CLOSE
   ================================================== */

messageOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            messageOverlay
        ) {

            closeMessage();

        }

    }
);


/* ==================================================
   SECTION 21: ESCAPE KEY
   ================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeMessage();

        }

    }
);


/* ==================================================
   SECTION 22: INITIAL COLOR
   ================================================== */

updateColors(
    colorProgress
);
