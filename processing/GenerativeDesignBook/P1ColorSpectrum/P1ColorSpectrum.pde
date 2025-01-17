

int stepX;
int stepY;

void settings () {
	size(720, 720, FX2D);
}

void setup() {
	background(0);
	noStroke();
}

void draw() {
	colorMode(HSB, width, height, 100);

	stepX = mouseX + 2;
	stepY = mouseY + 2;

	for(int gridY = 0; gridY < height; gridY += stepY) {
		for(int gridX = 0; gridX < width; gridX += stepX){
			fill(gridX, height - gridY, 100);
			rect(gridX, gridY, stepX, stepY);
		}
	}
}