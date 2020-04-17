import {Tile} from "./tile";

export enum DockPlacement {
  TOP_CENTER = "COVE_top_center",
  TOP_RIGHT = "COVE_top_right",
  BOTTOM_RIGHT = "COVE_bottom_right",
  BOTTOM_CENTER = "COVE_bottom_center",
  BOTTOM_LEFT = "COVE_bottom_left",
  TOP_LEFT = "COVE_top_left",
  NONE = "COVE_none",
}

export interface DockParams {
    tileXPos: number,
    tileYPos: number,
    dockPlacement: DockPlacement,
}

export default class Dock {
    private static readonly VerticalBeachBuffer = 40;
    private static readonly DiagonalBeachBuffer = 15;

    // Render properties.
    public readonly xPos: number;
    public readonly yPos: number;
    public readonly width: number;
    public readonly height: number;
    public readonly dockPlacement: DockPlacement;

    constructor(dp: DockParams) {
        this.dockPlacement = dp.dockPlacement;
        switch(dp.dockPlacement) {
            case DockPlacement.TOP_CENTER:
                this.xPos = dp.tileXPos;
                this.yPos = dp.tileYPos - Tile.Height / 2 - Dock.VerticalBeachBuffer; 
                this.width = 106;
                this.height = 37;
                break;
            case DockPlacement.TOP_RIGHT:
                this.xPos = dp.tileXPos + Tile.Width / 2 + Dock.DiagonalBeachBuffer;
                this.yPos = dp.tileYPos - Tile.Height / 4 - Dock.DiagonalBeachBuffer; 
                this.width = 89;
                this.height = 87;
                break;
            case DockPlacement.BOTTOM_RIGHT:
                this.xPos = dp.tileXPos + Tile.Width / 2 + Dock.DiagonalBeachBuffer;
                this.yPos = dp.tileYPos + Tile.Height / 4 + Dock.DiagonalBeachBuffer; 
                this.width = 86;
                this.height = 93;
                break;
            case DockPlacement.BOTTOM_CENTER:
                this.xPos = dp.tileXPos;
                this.yPos = dp.tileYPos + Tile.Height / 2 + Dock.VerticalBeachBuffer; 
                this.width = 116;
                this.height = 43;
                break;
            case DockPlacement.BOTTOM_LEFT:
                this.xPos = dp.tileXPos - Tile.Width / 2 - Dock.DiagonalBeachBuffer;
                this.yPos = dp.tileYPos + Tile.Height / 4 + Dock.DiagonalBeachBuffer; 
                this.width = 86;
                this.height = 93;
                break;
            case DockPlacement.TOP_LEFT:
                this.xPos = dp.tileXPos - Tile.Width / 2 - Dock.DiagonalBeachBuffer;
                this.yPos = dp.tileYPos - Tile.Height / 4 - Dock.DiagonalBeachBuffer; 
                this.width = 89;
                this.height = 87;
                break;
        }
    }
}