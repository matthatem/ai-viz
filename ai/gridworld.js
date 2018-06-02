/*
 * Class for the gridworld domain.
 *
 * Author: Matthew Hatem
 */

class GridWorld {
  int width_;
  int height_;
  int block_ = 2;
  int walls[][];
  PGraphics pg_ = null;  
  GridState goal_;
  color layerColor = color(255, 255, 0);

  GridWorld(int w, int h) {
    width_ = w;
    height_ = h;
    walls = new int[w][h];
  }

  void addWall(int x, int y) {
    walls[x][y] = 1;
  }

  boolean hitWall(int x, int y) {
    return walls[x][y] == 1;
  }

  void layer(GridState[] layer, float step) {
    pg_.beginDraw();
    pg_.image(pg_, 0, 0);
    pg_.noStroke();
    pg_.fill(layerColor);
    for (i in layer) {
      pg_.rect(layer[i].x_*block_, layer[i].y_*block_, block_, block_);
    }
    pg_.endDraw();
    
    float g = green(layerColor);
    g = (g <= step) ? step : g-step;
    layerColor = color(255, g, 0);
  }

  void draw() {
    if (pg_ == null) {
      pg_ = createGraphics(width_*block_, height_*block_, P2D);
      pg_.beginDraw();
      pg_.background(255);
      pg_.noStroke();
      pg_.fill(0);
      for (int x=0; x<width_; x++) {
	for (int y=0; y<height_; y++) {
	  if (walls[x][y] == 1) {
            pg_.rect(x*block_, y*block_, block_, block_);
          }
        }
      }
      pg_.endDraw();
    }
    image(pg_, 0, 0);
  }

  GridState[] expand(GridState state) {
    GridState[] states = {};
    // right
    if (state.x_+1 < width_ && walls[state.x_+1][state.y_] == 0) 
      states.push(new GridState(state.x_+1, state.y_, state));
    // left
    if (state.x_-1 > -1 && walls[state.x_-1][state.y_] == 0) 
      states.push(new GridState(state.x_-1, state.y_, state));
    // down
    if (state.y_+1 < height_ && walls[state.x_][state.y_+1] == 0) 
      states.push(new GridState(state.x_, state.y_+1, state));
    // up
    if (state.y_-1 > -1 && walls[state.x_][state.y_-1] == 0) 
      states.push(new GridState(state.x_, state.y_-1, state));
    return states;
  }

  void setGoal(GridState goal) {
    goal_ = goal;
  }

  boolean isGoal(GridState state) {
    return goal_.equals(state);
  }

  int computeHeuristic(int x, int y) {
    if (goal_ == null) return Number.POSITIVE_INFINITY;
    int dx = abs(goal.x_ - x);
    int dy = abs(goal.y_ - y);
    return dx + dy;
  }
} 

class GridState {
  int x_, y_, g_, h_, f_;
  GridState p_;

  GridState(int x, int y, GridState p) {
    x_ = x; y_ = y; p_ = p; 
    (p != null) ? g_ = p_.g_+1 : g_ = 0;
    h_ = gridWorld.computeHeuristic(x_, y_);
    f_ = g_ + h_;
  }

  boolean equals(GridState other) {
    return other.x_ == x_ && other.y_ == y_;
  }
}