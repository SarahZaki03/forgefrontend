// Load the extension on startup, like this:
// viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv, {extensions: ['GoogleMapsExtension']});
// Result: https://youtu.be/9kVHlTV8wHw

class GoogleMapsExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }
  quad(x, y) {
    const material = new THREE.MeshLambertMaterial({
      color: 0xf5f5f5,
      depthWrite: false,
    });

    // mapbox://styles/sarah0370/clkccpw7g000w01pobyfk0dll
    const texture = new THREE.TextureLoader().load(
      `https://a.tile.openstreetmap.org/16/${x}/${y}.png`
    );
    // `https://a.tile.openstreetmap.org/16/${x}/${y}.png`
    // `https://api.mapbox.com/styles/v1/sarah0370/clkccpw7g000w01pobyfk0dll/tiles/256/16/${x}/${y}{@2x}?access_token=pk.eyJ1Ijoic2FyYWgwMzcwIiwiYSI6ImNsa2NhZ3RobzBxYzQzbHFvMDFmZ2o0aXcifQ.7cG-z4IvKSYDJvdn1IG3dQ`
    // `https://api.mapbox.com/styles/v1/mapbox://styles/sarah0370/clkccpw7g000w01pobyfk0dll/tiles/256/16/${x}/${y}{@2x}?access_token=pk.eyJ1Ijoic2FyYWgwMzcwIiwiYSI6ImNsa2NhZ3RobzBxYzQzbHFvMDFmZ2o0aXcifQ.7cG-z4IvKSYDJvdn1IG3dQ`

    material.map = texture;

    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(700, 700),
      material
    );
    mesh.position.set(x * 256, y * 256, -45);
    return mesh;
  }

  load() {
    this.viewer.addEventListener(
      Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
      () => {
        // console.log(this.viewer.overlays.addScene("map"));
        if (!this.viewer.overlays.hasScene("map")) {
          this.viewer.overlays.addScene("map");
        }
        const tiles = new THREE.Object3D();
        tiles.position.set(-1140, -800, -10);
        tiles.scale.set(2, 2, 1);
        const tilex = [0, 1, 2, 3];
        const tiley = [0, 1, 2];
        tilex.map((x) => {
          tiley.map((y) => {
            tiles.add(this.quad(x, y));
          });
        });
        window.tiles = tiles;
        this.viewer.overlays.addMesh(tiles, "map");
      }
    );
    return true;
  }
  unload() {
    return true;
  }
}
Autodesk.Viewing.theExtensionManager.registerExtension(
  "GoogleMapsExtension",
  GoogleMapsExtension
);
