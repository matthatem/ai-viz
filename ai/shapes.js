/*
 * Classes for shapes.
 *
 * Author: Matthew Hatem
 */

class Rectangle {
  float x_, y_, w_, h_;
  color background_, foreground_;

  // Constructor
  Rectangle(float x, float y, float w, float h) {
    x_ = x; y_ = y; w_ = w; h_ = h; 
    background_ = AI_COLOR_RECT_BACKGROUND;
    foreground_ = AI_COLOR_RECT_FOREGROUND;
  }

  boolean intersects(Rectangle rect) {
    var x0 = Math.max(x_, rect.x_);
    var x1 = Math.min(x_ + w_, rect.x_ + rect.w_);
    if (x0 <= x1) {
      var y0 = Math.max(y_, rect.y_);
      var y1 = Math.min(y_ + h_, rect.y_ + rect.h_);
      if (y0 <= y1) {
        return true;
      }
    }
    return false;
  }
  
  boolean contains(float x, float y) {
    return x >= x_ &&
           x <= x_ + w_ &&
           y >= y_ &&
           y <= y_ + h_;
  }  

  void draw() {
    stroke(foreground_);
    strokeWeight(1.0);
    strokeJoin(MITER);
    fill(background_);
    rect(x_, y_, w_, h_);
  }

  void setBackground(color background) {
    background_ = background;
  }

  void setForeground(color foreground) {
    foreground_ = foreground;
  }

}
