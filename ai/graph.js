/*
 * Classes for graphs.
 *
 * Author: Matthew Hatem
 */

class Node {
  float x_, y_, g_;
  Node parent_;
  Node[] children_ = {};
  color background_, foreground_;

  // Constructor
  Node(float x, float y, float g, Node parent) {
    x_ = x; y_ = y; g_ = g;
    parent_ = parent;
    if (parent_) {
      background_ = AI_COLOR_NODE_BACKGROUND; 
      foreground_ = AI_COLOR_NODE_FOREGROUND; 
    }
    else { 
      background_ = AI_COLOR_ROOT_BACKGROUND; 
      foreground_ = AI_COLOR_ROOT_FOREGROUND;
    }
  }
  
  void addChild(Node child) {
    children_.push(child);
  }

  void draw() {
    for (i in children_) {
      Node child = children_[i];
      child.draw();
      stroke(AI_COLOR_EDGE);
      line(x_, y_, child.x_, child.y_);
    }
    if (parent_) {
      noStroke();
      fill(background_);
      ellipse(x_, y_, 3, 3);
    }
    else {
      stroke(foreground_);
      fill(background_);
      ellipse(x_, y_, 10, 10);
    }
  }
}

