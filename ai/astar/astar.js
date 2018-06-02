/*
 * A* algorithm
 *
 * Author: Matthew Hatem
 */

/* @pjs pauseOnBlur="true"; */

int WIDTH = 800;
int HEIGHT = 600;

GridWorld gridWorld = new GridWorld(WIDTH/2, HEIGHT/2);
GridState initial, goal;
FScoreFunction scoreFunction = new FScoreFunction();
OpenList open = new OpenList(scoreFunction);
GridState closed[][] = new int[WIDTH/2][HEIGHT/2];
GridState solution = null;

int layerSize = 50;
GridState[] layerList = {};

void setup() {
  size(WIDTH, HEIGHT);

  // randomly generate some obstacles
  for (int i = 0; i<40000; i++) {
    int x = random(1, WIDTH/2-1);
    int y = random(1, HEIGHT/2-1);
    // don't put a wall on the initial node
    if (x == 50 && y == (HEIGHT/2)/2) continue; 
    gridWorld.addWall((int)x, (int)y);
  }

  // assign initial and goal states
  goal = new GridState(WIDTH/2-1, (HEIGHT/2)/2, null);
  initial = new GridState(50, (HEIGHT/2)/2, null);
  gridWorld.setGoal(goal);

  // put initial on open
  open.push(initial);
}

void draw() {
  // perform A* search step
  if (solution == null) {
    for (int i=0; i<layerSize; i++) {
     astar();
    }
  }

  // draw the grid 
  gridWorld.draw();

  // print a layer and step if necessary
  if (layerList.length >= layerSize) {
    gridWorld.layer(layerList, 1);
    layerList.splice(0, layerList.length);
  }
}

void astar() {
  GridState state = open.pop();
  if (gridWorld.isGoal(state)) {
    solution = state;
    gridWorld.layer(layerList, 0);
    return;
  }

  GridState[] states = gridWorld.expand(state);
  for (int i in states) {
    if (closed[states[i].x_][states[i].y_] == 0) {
      open.push(states[i]);
      closed[states[i].x_][states[i].y_] = 1;
      layerList.push(states[i]);
    }
  }
}


// TODO: allow tie breaking on g
class FScoreFunction {
  int score(Object element) {
    return ((GridState)element).f_;
  }
}