export const sbcSlices = [
  {
    slice_type: "hero",
    variation: "default",
    id: "hero-sbc",
    primary: {
      heading: [
        {
          type: "heading1",
          text: "BOTTLING CO.",
          spans: [],
          direction: "ltr",
        },
      ],
      subheading: [
        {
          type: "paragraph",
          text: "PEPSI • 7UP • MOUNTAIN DEW • MIRINDA • DR PEPPER",
          spans: [],
          direction: "ltr",
        },
      ],
      body: [
        {
          type: "paragraph",
          text: "The undisputed powerhouse of global beverage giants. Five legendary drinks, infinite fizz, and unmatched refreshment bottled to perfection by Seven-Up Bottling Company.",
          spans: [],
          direction: "ltr",
        },
      ],
      button_text: "Explore The 5 Giants",
      button_link: {
        link_type: "Web",
        url: "#carousel",
      },
      cans_image: {
        url: "/labels/pepsi.jpg",
        alt: "Seven-Up Bottling Co. Portfolio",
        dimensions: { width: 1280, height: 687 },
      },
      second_heading: [
        {
          type: "heading2",
          text: "5 TITANS. ONE EPIC FIZZ.",
          spans: [],
          direction: "ltr",
        },
      ],
      second_body: [
        {
          type: "paragraph",
          text: "From the crisp, bold bite of ice-cold Pepsi to the crystal-clean citrus clarity of 7UP, the neon adrenaline rush of Mountain Dew, the sunburst orange punch of Mirinda, and the authentic 23-flavor mystery of Dr Pepper.",
          spans: [],
          direction: "ltr",
        },
      ],
    },
  },
  {
    slice_type: "sky_dive",
    variation: "default",
    id: "skydive-sbc",
    primary: {
      sentence: "FEEL THE ICY RUSH",
      flavor: "sevenUp",
    },
  },
  {
    slice_type: "carousel",
    variation: "default",
    id: "carousel-sbc",
    primary: {
      heading: [
        {
          type: "heading2",
          text: "CHOOSE YOUR DRINK",
          spans: [],
          direction: "ltr",
        },
      ],
      price_copy: [
        {
          type: "paragraph",
          text: "Drag to rotate the physical 3D can. Click the arrows to explore Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper.",
          spans: [],
          direction: "ltr",
        },
      ],
    },
  },
  {
    slice_type: "alternating_text",
    variation: "default",
    id: "alternating-sbc",
    primary: {
      text_group: [
        {
          heading: [
            {
              type: "heading2",
              text: "PEPSI: BOLD REFRESHMENT",
              spans: [],
              direction: "ltr",
            },
          ],
          body: [
            {
              type: "paragraph",
              text: "The pulse of a new generation. Masterfully carbonated, intensely refreshing, and packed with that legendary cola snap that hits instantly from the first drop.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          heading: [
            {
              type: "heading2",
              text: "7UP: CRISP CITRUS PURITY",
              spans: [],
              direction: "ltr",
            },
          ],
          body: [
            {
              type: "paragraph",
              text: "The iconic Uncola. Crafted with 100% natural lemon and lime flavors for a clean, bubbly burst of pure crispness that resets your palate and invigorates your senses.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          heading: [
            {
              type: "heading2",
              text: "MOUNTAIN DEW: CHARGED CITRUS",
              spans: [],
              direction: "ltr",
            },
          ],
          body: [
            {
              type: "paragraph",
              text: "High-octane neon citrus energy engineered to charge your senses. An exhilarating rush of one-of-a-kind citrus flavor with zero compromises.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          heading: [
            {
              type: "heading2",
              text: "MIRINDA: SUNBURST ORANGE",
              spans: [],
              direction: "ltr",
            },
          ],
          body: [
            {
              type: "paragraph",
              text: "An intensely fruity, vibrant sunburst orange explosion bursting with vivid sweetness and joyful, effervescent fizzy pop. Taste the bright side of life.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
        {
          heading: [
            {
              type: "heading2",
              text: "DR PEPPER: 23 BOLD FLAVORS",
              spans: [],
              direction: "ltr",
            },
          ],
          body: [
            {
              type: "paragraph",
              text: "The legendary, inimitable secret recipe of 23 authentic flavors blended into one incomparably deep, rich soda. Bottled with passion by SBC.",
              spans: [],
              direction: "ltr",
            },
          ],
        },
      ],
    },
  },
  {
    slice_type: "big_text",
    variation: "default",
    id: "big-text-sbc",
    primary: {},
  },
] as any[];
