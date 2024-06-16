import HeaderImage from "@/public/projects/echolens/header.png";
import PorfileImage from "@/public/profile.jpg";

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import SimplifiedCode from "@/components/utils/simplified-code";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";
import Code from "@/components/utils/code";

import {
	// Conclusion,
	// DemoWithImage,
	// DemoWithRealTimeVideo,
	// DemoWithVideo,
	Introduction,
	// SetUpEnvironment,
} from "./utils";

const installPyPackages = `
	pip install cvzone==1.5.6 ultralytics==8.0.26 hydra-core>=1.2.0 matplotlib>=3.2.2 numpy>=1.18.5 opencv-python==4.5.4.60 Pillow>=7.1.2 PyYAML>=5.3.1 requests>=2.23.0 scipy>=1.4.1 torch>=1.7.0 torchvision>=0.8.1 tqdm>=4.64.0 filterpy==1.4.5 scikit-image==0.19.3 lap==0.4.0   

`;
const staticImageTestingCode = `
	"""
		Static Image Test
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/Computer-Vision/
	"""

	from ultralytics import YOLO  
	import cv2

	model = YOLO(
		# Path to the YOLO weights if installed. If not, provide the location for installation
		# Use yolov8n (nano), yolov8m (medium) or yolov8l (large)
		"yolov8n.pt"
	)

	results = model(
		"cars.png", # Path to the image
		show=True,  # Show the output image
	)

	# Keep image opened until the user presses a key
	cv2.waitKey(0)

`;
const staticVideoTestingCode = `
	"""
		Static Video Test
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/Computer-Vision/
	"""

	from ultralytics import YOLO
	from sort import *
	import cvzone
	import math
	import cv2

	targetClassNames = ["car", "motorbike", "bus", "truck"]
	classNames = [
		"person",
		"bicycle",
		"car",
		"motorbike",
		"aeroplane",
		"bus",
		"train",
		"truck",
		"boat",
		"traffic light",
		"fire hydrant",
		"stop sign",
		"parking meter",
		"bench",
		"bird",
		"cat",
		"dog",
		"horse",
		"sheep",
		"cow",
		"elephant",
		"bear",
		"zebra",
		"giraffe",
		"backpack",
		"umbrella",
		"handbag",
		"tie",
		"suitcase",
		"frisbee",
		"skis",
		"snowboard",
		"sports ball",
		"kite",
		"baseball bat",
		"baseball glove",
		"skateboard",
		"surfboard",
		"tennis racket",
		"bottle",
		"wine glass",
		"cup",
		"fork",
		"knife",
		"spoon",
		"bowl",
		"banana",
		"apple",
		"sandwich",
		"orange",
		"broccoli",
		"carrot",
		"hot dog",
		"pizza",
		"donut",
		"cake",
		"chair",
		"sofa",
		"pottedplant",
		"bed",
		"diningtable",
		"toilet",
		"tvmonitor",
		"laptop",
		"mouse",
		"remote",
		"keyboard",
		"cell phone",
		"microwave",
		"oven",
		"toaster",
		"sink",
		"refrigerator",
		"book",
		"clock",
		"vase",
		"scissors",
		"teddy bear",
		"hair drier",
		"toothbrush",
	]
	limits = [360, 297, 673, 297]
	totalCount = []
	lineColor = (0, 0, 255)

	mask = cv2.imread(
		# Track only a specific region in the video
		"mask.png"
	)
	cap = cv2.VideoCapture(
		# Path to the video location
		"cars.mp4"
	)

	model = YOLO(
		# Path to the YOLO weights if installed. If not, provide the location for installation
		# Use yolov8n (nano), yolov8m (medium) or yolov8l (large)
		"yolov8n.pt"
	)
	
	# Check this github account for the Sort algorithm: https://github.com/abewley
	tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)

	while True:
		_, frame = cap.read()
		frameRegion = cv2.bitwise_and(frame, mask)
		results = model(frameRegion, stream=True)

		detections = np.empty((0, 5))

		for r in results:
			boxes = r.boxes
			for box in boxes:
				cls = int(box.cls[0])
				currentClass = classNames[cls]

				if currentClass in targetClassNames:
					x1, y1, x2, y2 = box.xyxy[0]
					x1, y1, w, h = int(x1), int(y1), int(x2 - x1), int(y2 - y1)
					conf = math.floor(box.conf[0] * 100) / 100

					currentArray = np.array([x1, y1, x2, y2, conf])
					detections = np.vstack((detections, currentArray))

		trackerResults = tracker.update(detections)
		cv2.line(frame, (limits[0], limits[1]), (limits[2], limits[3]), lineColor, 3)

		cvzone.putTextRect(
			frame,
			f"Total Count: {len(totalCount)}",
			(8, 24),
			1.5,
			2,
			(255, 255, 255),
			(247, 127, 0),
			cv2.FONT_HERSHEY_PLAIN,
			5,
		)

		for res in trackerResults:
			x1, y1, x2, y2, id = res
			x1, y1, w, h = int(x1), int(y1), int(x2 - x1), int(y2 - y1)
			cvzone.cornerRect(frame, (x1, y1, w, h), 10, 2, 1)
			cvzone.putTextRect(frame, f"{int(id)}", (x1, y1 - 5))

			cx, cy = int(x1 + w / 2), int(y1 + h / 2)
			cv2.circle(frame, (cx, cy), 3, (247, 127, 0), cv2.FILLED)

			if limits[0] <= cx <= limits[2] and limits[1] - 15 <= cy <= limits[1] + 15:
				if totalCount.count(id) == 0:
					lineColor = (0, 255, 0)
					totalCount.append(id)
				else:
					lineColor = (0, 0, 255)

		cv2.imshow("Cars Counter", frame)
		cv2.waitKey(1)

`;

export default function EchoLensPage() {
	return (
		<div className="w-full max-w-[1200px] mx-auto">
			<Header
				props={{
					banner: HeaderImage,
					profile: PorfileImage,
					title: "EchoLens: AI Powered Smart Glasses",
					link: "https://elmadichoaib.vercel.app",
					user: "Choaib ELMADI",
				}}
			/>
			<div className="grid grid-cols-1 dm:grid-cols-[auto_300px] gap-1">
				<div className="overflow-hidden">
					<>
						<Introduction />
						{/* <SetUpEnvironment id="setup-requirements" /> */}
						{/* <Code
							props={{
								id: "install-py-packages",
								title: "Install Python Libraries",
								description:
									"Ensure that you have these libraries installed in your Python environment before running the Car Counter project code. You can use the following command to install these libraries using pip:",
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: installPyPackages,
								language: "python",
							}}
						/> */}
					</>
				</div>
				<AuthorInfo
					props={{
						profile: PorfileImage,
						description:
							"I'm an embedded systems engineering student. I am currently pursuing a degree in Embedded Systems and Systems Control Engineering, where I engage in practical work involving robotics, electronics, and programming with platforms like Arduino and Raspberry Pi.",
						name: "Choaib ELMADI",
						link: "https://elmadichoaib.vercel.app",
					}}
				/>
			</div>
		</div>
	);
}
