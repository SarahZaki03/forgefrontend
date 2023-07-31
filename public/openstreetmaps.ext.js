// Load the extension on startup, like this:
// viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv, {extensions: ['OpenStreetMapsExtension']});
// Result: https://youtu.be/9kVHlTV8wHw

class OpenStreetMapsExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }
  quad(x, y) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(256, 256),
      new THREE.MeshLambertMaterial({
        color: 0xa0a0a0,
        depthWrite: false,
        map: THREE.ImageUtils.loadTexture(
          `https://api.mapbox.com/v4/mapbox.satellite/16/${59157 + x}/${
            40217 - y
          }.png?access_token=pk.eyJ1Ijoic2FyYWgwMzcwIiwiYSI6ImNsa2NhZ3RobzBxYzQzbHFvMDFmZ2o0aXcifQ.7cG-z4IvKSYDJvdn1IG3dQ`
        ),
      })
    );
    mesh.position.set(x * 256, y * 256, 1);
    return mesh;
  }

  load() {
    this.viewer.addEventListener(
      Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
      () => {
        if (!this.viewer.overlays.hasScene("map")) {
          this.viewer.overlays.addScene("map");
        }
        const tiles = new THREE.Object3D();
        tiles.position.set(-1140, -800, -10);
        tiles.scale.set(2, 2, 1);
        const tilex = [-1, 0, 1, 2, 3];
        const tiley = [0, 1, 2];
        tilex.map((x) => {
          tiley.map((y) => {
            tiles.add(this.quad(x, y));
          });
        });
        window.tiles = tiles;
        console.log(tiles);
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
  "OpenStreetMapsExtension",
  OpenStreetMapsExtension
);
