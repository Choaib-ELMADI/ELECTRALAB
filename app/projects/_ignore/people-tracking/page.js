import HeaderImage from "@/public/projects/people-tracking/hheader.png";
import PorfileImage from "@/public/profile.jpg";

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import SimplifiedCode from "@/components/utils/simplified-code";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";
import Code from "@/components/utils/code";
import {
	Conclusion,
	DemoWithImage,
	DemoWithVideo,
	Introduction,
	SetUpEnvironment,
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
	import cvzone
	import math
	import cv2

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

	cap = cv2.VideoCapture(
		"people.png" # Path to the image
	)

	model = YOLO(
		# Path to the YOLO weights if installed. If not, provide the location for installation
		# Use yolov8n (nano), yolov8m (medium) or yolov8l (large)
		"yolov8n.pt"
	)

	while True:
		_, img = cap.read()
		results = model(img, stream=True)

		for r in results:
			boxes = r.boxes
			for box in boxes:
				# GET THE BOUNDING BOX
				x1, y1, x2, y2 = box.xyxy[0]
				x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
				w, h = x2 - x1, y2 - y1
				cvzone.cornerRect(img, (x1, y1, w, h))

				# GET THE CONFIDENCE
				conf = math.floor(box.conf[0] * 100) / 100

				# GET THE CLASSIFICATION
				cls = box.cls[0]
				clsIndex = int(cls)
				if classNames[clsIndex] == "person": # Track only people
					cvzone.putTextRect(
						img,
						f"{classNames[clsIndex]} {conf}",
						(max(5, x1), max(35, y1 - 20)),
						1,
						1,
					)

		cv2.imshow("Image", img)
		cv2.waitKey(0) # Wait for a key press to exit program

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

	targetClassNames = ["person"]
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

	# FOR PEOPLE GOING DOWN
	limitsDown = [505, 500, 705, 500]
	totalCountDown = []
	lineDownColor = (0, 0, 255)
	# FOR PEOPLE GOING UP
	limitsUp = [130, 240, 330, 240]
	totalCountUp = []
	lineUpColor = (0, 255, 0)

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
		imgGraphics = cv2.imread(
			"graphics.png", # Show the Up / Down arrows
			cv2.IMREAD_UNCHANGED,
		)
		frame = cvzone.overlayPNG(frame, imgGraphics, (240, 0))
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

		# FOR PEOPLE GOING DOWN
		cv2.line(
			frame,
			(limitsDown[0], limitsDown[1]),
			(limitsDown[2], limitsDown[3]),
			lineDownColor,
			3,
		)
		# FOR PEOPLE GOING UP
		cv2.line(
			frame,
			(limitsUp[0], limitsUp[1]),
			(limitsUp[2], limitsUp[3]),
			lineUpColor,
			3,
		)

		# FOR PEOPLE GOING DOWN
		cvzone.putTextRect(
			frame,
			f"{len(totalCountDown)}",
			(535, 50),
			2.5,
			2,
			(0, 0, 255),
			(255, 255, 255),
			cv2.FONT_HERSHEY_PLAIN,
			5,
		)
		# FOR PEOPLE GOING UP
		cvzone.putTextRect(
			frame,
			f"{len(totalCountUp)}",
			(375, 50),
			2.5,
			2,
			(0, 255, 0),
			(255, 255, 255),
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

			# FOR PEOPLE GOING DOWN
			if (
				limitsDown[0] <= cx <= limitsDown[2]
				and limitsDown[1] - 15 <= cy <= limitsDown[1] + 15
			):
				if totalCountDown.count(id) == 0:
					lineDownColor = (255, 0, 0)
					totalCountDown.append(id)
				else:
					lineDownColor = (0, 0, 255)

			# FOR PEOPLE GOING UP
			if (
				limitsUp[0] <= cx <= limitsUp[2]
				and limitsUp[1] - 15 <= cy <= limitsUp[1] + 15
			):
				if totalCountUp.count(id) == 0:
					lineUpColor = (255, 0, 0)
					totalCountUp.append(id)
				else:
					lineUpColor = (0, 255, 0)

		cv2.imshow("People Tracking", frame)
		cv2.waitKey(1)

`;

export default function PeopleTracking() {
	return (
		<div className="w-full max-w-[1200px] mx-auto">
			<Header
				props={{
					banner: HeaderImage,
					profile: PorfileImage,
					title: "Object Detection: People Tracking",
					link: "https://elmadichoaib.vercel.app",
					user: "Choaib ELMADI",
				}}
			/>
			<div className="grid grid-cols-1 dm:grid-cols-[auto_300px] gap-1">
				<div className="overflow-hidden">
					<>
						<Introduction />
						<SetUpEnvironment id="setup-requirements" />
						<Code
							props={{
								id: "install-py-packages",
								title: "Install Python Libraries",
								description:
									"Ensure that you have these libraries installed in your Python environment before running the People Tracking project code. You can use the following command to install these libraries using pip:",
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: installPyPackages,
								language: "python",
							}}
						/>
					</>

					<>
						<DemoWithImage
							props={{
								id: "static-image-testing",
								title: "Static Image Testing",
								description:
									"Let's start by looking at what our Escalator People Tracker system can do when we test it with static images.",
								image:
									"/projects/people-tracking/people-tracking-static-img.png",
							}}
						/>
						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: staticImageTestingCode,
								language: "python",
							}}
						/>
					</>

					<>
						<DemoWithVideo
							props={{
								id: "video-testing",
								title: "Video Testing",
								description:
									"Explore our innovative Escalator Tracker system, delving into its dynamic world to witness its remarkable accuracy and efficiency. Through static video testing, we analyze its seamless ability to track people moving up and down the escalator effortlessly.",
								note: "Watching the video at Speed X16 - My poor PC is weeping uncontrollably in the corner! 😂.  Someone send it some tissues and a hug!",
								video:
									"/projects/people-tracking/people-tracking-static-video.mp4",
							}}
						/>

						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: staticVideoTestingCode,
								language: "python",
							}}
						/>
					</>

					<Conclusion
						props={{
							title: "Wrapping Up",
							descriptions: [
								"In summary, our Escalator Tracker system highlights the effectiveness of computer vision technology in real-life situations, specifically in monitoring people's movement on escalators. Rigorous testing has validated the system's consistency in tracking individuals seamlessly as they ascend and descend. By accurately capturing this data, our project offers valuable insights for various sectors, including retail and public spaces, paving the way for enhanced crowd management and improved user experiences.",
								"Thank you for being a part of our journey. We're excited about a future where smart systems, like our Escalator Passenger Tracker, make urban spaces more efficient. Your support means the world to us!",
							],
						}}
					/>

					<>
						<NavigateToOtherProjects
							props={{
								prev: "/projects/cars-counter",
								prevTitle: "Cars Counter",
								next: "/projects/poker-card-game",
								nextTitle: "Poker Card Game",
							}}
						/>
						<Support />
					</>
				</div>
				<AuthorInfo
					props={{
						profile: PorfileImage,
						description:
							"Hi! I'm Choaib. I'm an embedded systems engineering student, currently pursuing a degree in Embedded Systems and Systems Control Engineering. My work focuses on robotics, electronics, and programming using platforms like Arduino and Raspberry Pi. In addition to embedded systems, I am proficient in web development, building applications with technologies like React, Next.js, and TailwindCSS, which complement my engineering projects by creating intuitive interfaces and real-time control systems.",
						name: "Choaib ELMADI",
						link: "https://elmadichoaib.vercel.app",
					}}
				/>
			</div>
		</div>
	);
}
