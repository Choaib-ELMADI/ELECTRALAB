import HeaderImage from "@/public/projects/poker-card-game/header.png";
import PorfileImage from "@/public/profile.jpg";

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import SimplifiedCode from "@/components/utils/simplified-code";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";
import Code from "@/components/utils/code";
import {
	SetUpEnvironment,
	DownloadWeights,
	DemoWithVideo,
	DemoWithImage,
	Introduction,
	Conclusion,
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
		"10C",
		"10D",
		"10H",
		"10S",
		"2C",
		"2D",
		"2H",
		"2S",
		"3C",
		"3D",
		"3H",
		"3S",
		"4C",
		"4D",
		"4H",
		"4S",
		"5C",
		"5D",
		"5H",
		"5S",
		"6C",
		"6D",
		"6H",
		"6S",
		"7C",
		"7D",
		"7H",
		"7S",
		"8C",
		"8D",
		"8H",
		"8S",
		"9C",
		"9D",
		"9H",
		"9S",
		"AC",
		"AD",
		"AH",
		"AS",
		"JC",
		"JD",
		"JH",
		"JS",
		"KC",
		"KD",
		"KH",
		"KS",
		"QC",
		"QD",
		"QH",
		"QS",
	]

	cap = cv2.VideoCapture(
		"poker-cards.png" # Path to the image
	)

	model = YOLO(
		# Path to the YOLO weights, Download link below
		"playing-cards.pt"
	)

	while True:
		_, img = cap.read()
		results = model(img, stream=True)

		for r in results:
			boxes = r.boxes
			for box in boxes:
				# FOR THE BOUNDING BOX
				x1, y1, x2, y2 = box.xyxy[0]
				x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
				w, h = x2 - x1, y2 - y1
				cvzone.cornerRect(img, (x1, y1, w, h))

				# FOR THE CONFIDENCE
				conf = math.floor(box.conf[0] * 100) / 100

				# FOR THE CLASSIFICATION
				cls = box.cls[0]
				clsIndex = int(cls)
				cvzone.putTextRect(
					img, f"{classNames[clsIndex]}", (x1 + 3, y1 - 5), 1.25, 1, offset=4
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
	import cvzone
	import math
	import cv2

	classNames = [
		"10C",
		"10D",
		"10H",
		"10S",
		"2C",
		"2D",
		"2H",
		"2S",
		"3C",
		"3D",
		"3H",
		"3S",
		"4C",
		"4D",
		"4H",
		"4S",
		"5C",
		"5D",
		"5H",
		"5S",
		"6C",
		"6D",
		"6H",
		"6S",
		"7C",
		"7D",
		"7H",
		"7S",
		"8C",
		"8D",
		"8H",
		"8S",
		"9C",
		"9D",
		"9H",
		"9S",
		"AC",
		"AD",
		"AH",
		"AS",
		"JC",
		"JD",
		"JH",
		"JS",
		"KC",
		"KD",
		"KH",
		"KS",
		"QC",
		"QD",
		"QH",
		"QS",
	]

	cap = cv2.VideoCapture(
		"poker-cards.mp4" # Path to the video
	)
	cap.set(3, 1280)
	cap.set(4, 720)

	model = YOLO(
		# Path to the YOLO weights, Download link below
		"playing-cards.pt"
	)

	while True:
		_, frame = cap.read()
		results = model(frame, stream=True)

		for r in results:
			boxes = r.boxes
			for box in boxes:
				# FOR THE BOUNDING BOX
				x1, y1, x2, y2 = box.xyxy[0]
				x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
				w, h = x2 - x1, y2 - y1
				cvzone.cornerRect(frame, (x1, y1, w, h))

				# FOR THE CONFIDENCE
				conf = math.floor(box.conf[0] * 100) / 100

				# FOR THE CLASSIFICATION
				cls = box.cls[0]
				clsIndex = int(cls)
				cvzone.putTextRect(
					frame, f"{classNames[clsIndex]}", (x1 + 3, y1 - 5), 1.25, 1, offset=4
				)

		cv2.imshow("Video", frame)
		cv2.waitKey(1) # Keep the video playing

`;
const pokerHandDetector = `
	"""
		Poker Hand Detector
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/Computer-Vision/
	"""

	from ultralytics import YOLO
	import findPokerHand
	import cvzone
	import math
	import cv2

	classNames = [
		"10C",
		"10D",
		"10H",
		"10S",
		"2C",
		"2D",
		"2H",
		"2S",
		"3C",
		"3D",
		"3H",
		"3S",
		"4C",
		"4D",
		"4H",
		"4S",
		"5C",
		"5D",
		"5H",
		"5S",
		"6C",
		"6D",
		"6H",
		"6S",
		"7C",
		"7D",
		"7H",
		"7S",
		"8C",
		"8D",
		"8H",
		"8S",
		"9C",
		"9D",
		"9H",
		"9S",
		"AC",
		"AD",
		"AH",
		"AS",
		"JC",
		"JD",
		"JH",
		"JS",
		"KC",
		"KD",
		"KH",
		"KS",
		"QC",
		"QD",
		"QH",
		"QS",
	]

	cap = cv2.VideoCapture(
		"poker-cards.mp4" # Path to the video
	)
	cap.set(3, 1280)
	cap.set(4, 720)

	model = YOLO(
		# Path to the YOLO weights, Download link below
		"playing-cards.pt"
	)

	while True:
		_, frame = cap.read()
		results = model(frame, stream=True)
		hand = []

		for r in results:
			boxes = r.boxes
			for box in boxes:
				x1, y1, x2, y2 = box.xyxy[0]
				x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
				w, h = x2 - x1, y2 - y1
				cvzone.cornerRect(frame, (x1, y1, w, h))

				conf = math.floor(box.conf[0] * 100) / 100

				cls = box.cls[0]
				clsIndex = int(cls)
				cvzone.putTextRect(
					frame, f"{classNames[clsIndex]}", (x1 + 3, y1 - 5), 1.25, 1, offset=4
				)

				if conf > 0.4:
					hand.append(classNames[clsIndex])

		hand = list(set(hand))

		if len(hand) == 0:
			cvzone.putTextRect(frame, "Your Hand is Empty", (30, 40), 1.5, 2, offset=6)

		if len(hand) == 5:
			res = findPokerHand.findPokerHand(hand)
			cvzone.putTextRect(frame, f"Your Hand: {res}", (30, 40), 1.5, 2, offset=6)

		cv2.imshow("Poker Card Game", frame)
		cv2.waitKey(1)

`;
const findPokerHand = `
	"""
		Find Poker Hand Function
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/Computer-Vision/
	"""

	def findPokerHand(hand):
		pokerHandRanks = {
			10: "Royal Flush",
			9: "Straight Flush",
			8: "Four of a Kind",
			7: "Full House",
			6: "Flush",
			5: "Straight",
			4: "Three of a Kind",
			3: "Two Pair",
			2: "Pair",
			1: "High Card",
		}
		ranks = []
		suits = []
		possibleRanks = []

		for card in hand:
			if len(card) == 3:
				rank = card[0:2]
			else:
				rank = card[0]

			if rank == "A":
				rank = 14
			elif rank == "K":
				rank = 13
			elif rank == "Q":
				rank = 12
			elif rank == "J":
				rank = 11

			suit = card[-1]

			ranks.append(int(rank))
			suits.append(suit)

		sortedRanks = sorted(ranks)

		# --> Royal Flush, Straight Flush, Flush
		if suits.count(suits[0]) == len(suits):
			if [10, 11, 12, 13, 14] == sortedRanks:
				possibleRanks.append(10)
			elif sortedRanks[0] == sortedRanks[4] - 4:
				possibleRanks.append(9)
			else:
				possibleRanks.append(6)

		ranksUniqueVals = list(set(sortedRanks))
		if len(ranksUniqueVals) == 2:
			for val in ranksUniqueVals:
				# --> Four of a Kind
				if sortedRanks.count(val) == 4:
					possibleRanks.append(8)
				# --> Full House
				else:
					possibleRanks.append(7)
		elif len(ranksUniqueVals) == 3:
			for val in ranksUniqueVals:
				# --> Three of a Kind
				if sortedRanks.count(val) == 3:
					possibleRanks.append(4)
				# --> Two Pair
				elif sortedRanks.count(val) == 2:
					possibleRanks.append(3)
		# --> Pair
		elif len(ranksUniqueVals) == 4:
			possibleRanks.append(2)

		# --> Straight
		if all(
			sortedRanks[i] == sortedRanks[i - 1] + 1 for i in range(1, len(sortedRanks))
		):
			possibleRanks.append(5)

		# --> High Card
		if not possibleRanks:
			possibleRanks.append(1)

		output = pokerHandRanks[max(possibleRanks)]
		return output

`;

export default function PokerCardGame() {
	return (
		<div className="w-full max-w-[1200px] mx-auto">
			<Header
				props={{
					banner: HeaderImage,
					profile: PorfileImage,
					title: "Object Detection: Poker Card Game",
					link: "https://elmadichoaib.vercel.app",
					user: "Choaib ELMADI",
				}}
			/>
			<div className="grid grid-cols-1 dm:grid-cols-[auto_300px] gap-1">
				<div className="overflow-hidden flex flex-col">
					<>
						<Introduction />
						<SetUpEnvironment id="setup-requirements" />
						<Code
							props={{
								id: "install-py-packages",
								title: "Install Python Libraries",
								description:
									"Ensure that you have these libraries installed in your Python environment before running the Poker Hand Detector code. You can use the following command to install these libraries using pip:",
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
									"In our initial testing phase, we put our Poker Hand Recognition System to the test using a static image of poker cards. This allowed us to evaluate the accuracy and efficiency of our YOLO-based model in identifying various poker hand types.",
								image: "/projects/poker-card-game/poker-game-static-img.png",
							}}
						/>
						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: staticImageTestingCode,
								language: "python",
							}}
						/>
						<DownloadWeights link="/yolo-weights/playing-cards.pt" />
					</>

					<>
						<DemoWithVideo
							props={{
								id: "video-testing",
								title: "Video Testing",
								description:
									"By processing a video stream of poker cards, we examined the system's performance in dynamic scenarios. This crucial step ensured that our YOLO-based model maintains accuracy and efficiency while capturing the fast-paced nature of poker gameplay.",
								note: "(Video Speed X16)",
								video: "/projects/poker-card-game/poker-game-static-video.mp4",
							}}
						/>

						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: staticVideoTestingCode,
								language: "python",
							}}
						/>
						<DownloadWeights link="/yolo-weights/playing-cards.pt" />
					</>

					<>
						<DemoWithVideo
							props={{
								id: "detect-poker-hand",
								title: "Detect Poker Hand",
								description:
									"Now, after successfully testing our model with a static video and confirming its ability to recognize individual cards, we're enhancing its capabilities further. Our focus is on detecting specific poker hands, such as the coveted Royal Flush (['AH', 'KH', 'QH', 'JH', '10H']). This significant upgrade marks a key milestone, enabling our system to identify complete poker hands accurately during real-time gameplay.",
								note: "(Video Speed X16)",
								video: "/projects/poker-card-game/poker-hand-detector.mp4",
							}}
						/>

						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: pokerHandDetector,
								language: "python",
							}}
						/>
						<DownloadWeights link="/yolo-weights/playing-cards.pt" />
						<SimplifiedCode
							props={{
								githubLink: "https://github.com/Choaib-ELMADI/Computer-Vision",
								code: findPokerHand,
								language: "python",
							}}
						/>
					</>

					<Conclusion
						props={{
							title: "Conclusion",
							descriptions: [
								"In conclusion, our Poker Hand Recognition System represents a significant stride in the realm of artificial intelligence and gaming. By leveraging YOLO technology, we've successfully bridged the gap between traditional poker gameplay and advanced machine learning.",
								"Thank you for joining us on this exciting technological adventure. Your support inspires us. Stay tuned for more innovations. Happy exploring!",
							],
						}}
					/>

					<>
						<NavigateToOtherProjects
							props={{
								prev: "/projects/people-tracking",
								prevTitle: "People Tracking",
								next: "/projects/mini-balance-robot",
								nextTitle: "Mini Balance Robot",
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
