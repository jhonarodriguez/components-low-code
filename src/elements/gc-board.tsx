import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Board } from "../render/components/board/Board";
import { BoardSettings } from "../core/types";

class GcBoard extends HTMLElement {
  private root?: ReturnType<typeof createRoot>;
  private settings?: BoardSettings;

  connectedCallback() {
    this.root = createRoot(this);
    this.render();
  }

  set data(value: BoardSettings) {
    this.settings = value;
    this.render();
  }

  private render() {
    if (!this.root) return;
    if (!this.settings) {
      this.root.render(null);
      return;
    }
    this.root.render(
      <StrictMode>
        <Board settings={this.settings} />
      </StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
  }
}

customElements.define("gc-board", GcBoard);
