import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SimplifiedCode from "@/components/utils/simplified-code";

export const Introduction = () => {
	return (
		<div>
			<p className="text-small mb-3">
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					EchoLens
				</span>{" "}
				represents a transformative leap in communication technology,
				specifically designed to empower individuals who are{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					deaf or mute
				</span>
				. These smart glasses convert spoken language into text and translate
				sign language into spoken words, facilitating seamless interaction in
				everyday situations.
			</p>

			<p className="text-small mb-3">
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					EchoLens
				</span>{" "}
				works by using a connected device, such as a phone or PC, to capture
				spoken words in real-time. The audio is processed and converted into
				text, which is then displayed on a web interface accessible through the
				glasses. This allows users to instantly read what is being said around
				them, making verbal communication more accessible.
			</p>

			<p className="text-small mb-3">
				For{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					sign language
				</span>{" "}
				, EchoLens employs an AI model trained with Mediapipe and Scikit-Learn.
				Mediapipe detects hand gestures by recognizing key points on the hands,
				while Scikit-Learn classifies these gestures into words or phrases. The
				system converts these gestures into spoken words, enabling effective
				communication through sign language.
			</p>
		</div>
	);
};

export const Steps = () => {
	return (
		<div className="mt-8">
			<h1 className="text-medium mb-2 font-[500]">
				Here are the steps we&rsquo;ll take to successfully build the EchoLens
				project:
			</h1>
			<div className="ml-12">
				<ol className="list-inside list-decimal flex flex-col gap-1">
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#frame-design-3d-print">
							Frame Design and 3D Printing
						</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#pcb-development">PCB Development</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#ai-model">AI Model for Sign Language</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#web-interface-setup">Web Interface Setup</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#integration-and-testing">Integration and Testing</Link>
					</li>
				</ol>
			</div>
		</div>
	);
};

export const DesignStep = ({
	props: { id, title, description, images, conclusion, links },
}) => {
	return (
		<div id={id} className="mt-8">
			<Link
				href={`#${id}`}
				className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
			>
				{title}{" "}
				<LinkIcon
					size={20}
					className="inline text-secondary group-hover:text-purple transition-all"
				/>
			</Link>
			<p className="text-small mb-3">{description}</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 mn:grid-cols-3 gap-2">
				{images.map((image, i) => (
					<div
						key={`image-${i}`}
						className={`sm:max-h-[300px] ${
							images.length > 3 && "last:col-span-2"
						}`}
					>
						<Image
							src={image}
							width={400}
							height={400}
							draggable="false"
							alt={`${title} - ${i}`}
							className="w-full h-full rounded-sm object-cover"
						/>
					</div>
				))}
			</div>
			<p className="text-small mt-2">{conclusion}</p>
			{links.map(({ link, text }, index) => (
				<RedirectLink
					link={link}
					text={text}
					index={`link-${index}`}
					key={`link-${index}`}
				/>
			))}
		</div>
	);
};

export const RedirectLink = ({ link, text, index }) => {
	return (
		<Link
			href={link}
			target="_blank"
			className="block w-full rounded-sm px-1 py-3 text-center text-small mt-2 bg-gradient-to-r from-pink to-purple text-background dark:text-text hover:underline"
			key={index}
		>
			{text}
		</Link>
	);
};

export const AIModel = ({ props: { id, title } }) => {
	const images = [
		"/projects/echolens/ihear.jpg",
		"/projects/echolens/nothing.jpg",
	];

	const dataCollectionProgram = `
	'''
		Data Collection Program

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	'''

	# Import Libraries
	import mediapipe as mp
	import numpy as np
	import cv2
	import os

	# Define some Colors
	text_background = (198, 63, 88)  # PURPLE
	corner_color = (53, 53, 249)     # RED
	text_color = (239, 239, 239)     # WHITE
	border_color = (61, 147, 8)      # GREEN

	# Setup Folders for Collection
	DATA_PATH = os.path.join("Data")
	actions = np.array(["Yes", "WhatAreYouDoing", "TryBeing", "ToMeet", "ThankYou", "TakeCare", "SameAsYou", "Question", "Point", "Nothing", "IHear", "HowAreYou", "Hello", "Good", "Bye", "_BLANK_"])
	no_sequences = 40
	sequence_length = 30
	
	for action in actions:
		for sequence in range(no_sequences):
			try:
				os.makedirs(os.path.join(DATA_PATH, action, str(sequence)))
			except:
				pass
				
	# Collect Mediapipe Keypoints
	mp_drawing_styles = mp.solutions.drawing_styles
	mp_drawing = mp.solutions.drawing_utils
	mp_hands = mp.solutions.hands
	hands = mp_hands.Hands(max_num_hands=1)

	def mediapipe_detections(frame, model):
		frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
		frame.flags.writeable = False
		results = model.process(frame)
		frame.flags.writeable = True
		frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

		return frame, results


	def draw_landmarks(frame, results, color):
		if results.multi_hand_landmarks:
			for hand_landmarks in results.multi_hand_landmarks:
				mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)


	def extract_keypoints(results):
		hand_landmarks = np.zeros(63)
		
		if results.multi_hand_landmarks:
			hand_landmarks = np.array(
				[
					[landmark.x, landmark.y, landmark.z]
					for landmark in results.multi_hand_landmarks[0].landmark
				]
			).flatten()

		return hand_landmarks
		
	# The Main Loop
	stream_url = "http://192.168.169.196:81/stream" # Change this with your own camera url
	cap = cv2.VideoCapture(0) # Change this with your own camera index

	no_frames_counter = 0
	no_sequences_counter = 0
	index = 0
	current_action = actions[index]

	while True:
		_, image = cap.read()
		
		image, results = mediapipe_detections(image, hands)
		draw_landmarks(image, results, corner_color)
		right_hand = extract_keypoints(results)
		
		key = cv2.waitKey(1) & 0xFF
		
		if key == ord("s"):
			npy_path = os.path.join(DATA_PATH, current_action, str(no_sequences_counter), f"{no_frames_counter}.npy")
			np.save(npy_path, right_hand)
			no_frames_counter += 1
			if no_frames_counter == sequence_length:
				no_frames_counter = 0
				no_sequences_counter += 1
				if no_sequences_counter == no_sequences:
					break
		
		cv2.putText(image, f"Collecting Frames for '{current_action}'", (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 0, 0), 2, cv2.LINE_AA)
		cv2.putText(image, f"Video Num: {no_sequences_counter}", (15, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2, cv2.LINE_AA)
		cv2.putText(image, f"Frame Num: {no_frames_counter}", (15, 110), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2, cv2.LINE_AA)
		cv2.imshow("Image", image)
		
		if key == ord("n"):
			cv2.imwrite(f"{current_action}-image-{no_frames_counter}-{no_sequences_counter}.jpg", image)
		
		if key == ord("q"):
			break
		
	cap.release()
	cv2.destroyAllWindows()`;

	const trainingProgram = `
	'''
		Training Program

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	'''

	from sklearn.tree import DecisionTreeClassifier
	import pandas as pd
	import joblib
	import warnings

	warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")


	def train_new_model(data_path, model_output):
		df = pd.read_csv(data_path, header=None)
		df = df.iloc[:, 1:]

		X = df.iloc[:, 1:]
		y = df.iloc[:, 0]

		model = DecisionTreeClassifier()
		model.fit(X, y)
		joblib.dump(model, model_output)

		print(f"Model Trained: '{model_output}")


	data_name = "my_data"
	data_path = f"C:\\Users\\Choaib ELMADI\\Downloads\\D.I.F.Y\\Electronics\\Robotics\\6- EchoLens\\Sign Language Model\\Model\\{ data_name }.csv"

	model_name = "my_model"
	model_output = f"C:\\Users\\Choaib ELMADI\\Downloads\\D.I.F.Y\\Electronics\\Robotics\\6- EchoLens\\Sign Language Model\\Model\\{ model_name }.joblib"


	train_new_model(data_path, model_output)`;

	return (
		<div id={id} className="mt-8">
			<>
				<Link
					href={`#${id}`}
					className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
				>
					{title}{" "}
					<LinkIcon
						size={20}
						className="inline text-secondary group-hover:text-purple transition-all"
					/>
				</Link>
				<p className="text-small mb-3">
					In this step, we develop an AI model to recognize and translate sign
					language gestures for EchoLens.
				</p>
			</>

			<>
				<p className="text-small mb-3">
					We start by using Mediapipe to detect hand gestures through key point
					recognition, and then we collect a large set of data for each sign we
					want to add.
				</p>
				<Image
					src="/projects/echolens/hand-landmarks.png"
					width={1200}
					height={400}
					draggable="false"
					alt="Mediapipe Hand Landmarks"
					className="w-full rounded-sm object-cover"
				/>
				<div className="grid grid-cols-1 mn:grid-cols-2 gap-2 mt-2">
					{images.map((image, i) => (
						<div key={`image-${i}`}>
							<Image
								src={image}
								width={400}
								height={400}
								draggable="false"
								alt={`${title} - ${i}`}
								className="w-full rounded-sm object-cover"
							/>
						</div>
					))}
				</div>
				<SimplifiedCode
					props={{
						githubLink:
							"https://github.com/Choaib-ELMADI/echolens/blob/main/Sign%20Language%20Model/",
						code: dataCollectionProgram,
						language: "python",
					}}
				/>
				<p className="text-small my-3">
					This is the form of the data that we want:
				</p>
				<Image
					src="/projects/echolens/csv-data.png"
					width={1200}
					height={400}
					draggable="false"
					alt="CSV Data"
					className="w-full rounded-sm object-cover"
				/>
			</>

			<>
				<p className="text-small mt-3">
					We then train the model using Scikit-Learn to classify these gestures
					into corresponding words or phrases.
				</p>

				<SimplifiedCode
					props={{
						githubLink:
							"https://github.com/Choaib-ELMADI/echolens/blob/main/Sign%20Language%20Model/",
						code: trainingProgram,
						language: "python",
					}}
				/>
				<p className="text-small mt-3">
					This model enables EchoLens to convert sign language into spoken
					words, facilitating effective communication.
				</p>
				<RedirectLink
					link="https://github.com/Choaib-ELMADI/echolens/tree/main/Sign%20Language%20Model"
					text="Learn More - AI Model"
				/>
			</>
		</div>
	);
};

export const WebInterfaceSetup = ({
	props: {
		id,
		title,
		description_s,
		description_m,
		description_e,
		images,
		note,
		conclusion,
	},
}) => {
	const htmlCode = `
	<!--
		Basic HTML Structure

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	--!>
	
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>EchoLens | Smart Device</title>
		</head>

		<body>
			<section class="main">
				<div class="page-header">
					<div class="page-header__top">
						<h1 class="slogan">
							EchoLens - Your Personalized Gateway to a Beautiful Life.
						</h1>
					</div>
					<div class="page-header__bottom">
						<div class="mode-toggle-container">
							<input
								hidden
								id="dark-light-mode"
								name="dark-light-mode"
								type="checkbox"
							/>
							<label class="toggle" for="dark-light-mode">
								<div class="toggle__circle"></div>
							</label>
							<p id="dark-light-curr-mode">Dark</p>
						</div>
						<div class="dt-container">
							<form id="language-form">
								<div>
									<input
										type="radio"
										id="en"
										name="language"
										value="EN"
										checked
									/>
									<label for="en">EN</label>
								</div>
								<div>
									<input type="radio" id="fr" name="language" value="FR" />
									<label for="fr">FR</label>
								</div>
								<div>
									<input type="radio" id="ar" name="language" value="AR" />
									<label for="ar">AR</label>
								</div>
							</form>
							<div id="empty"></div>
							<span id="date-container">Date: 2/15/2024</span>
							<span id="time-container">Time: 14:17:51</span>
						</div>
					</div>
				</div>

				<div class="controls-container">
					<div class="listening control">
						<label for="toggle-listening" class="header">
							<h3>Listen</h3>
							<div class="controls-toggle-container">
								<input
									hidden
									id="toggle-listening"
									name="toggle-listening"
									type="checkbox"
								/>
								<label class="toggle" for="toggle-listening">
									<div class="toggle__circle"></div>
								</label>
							</div>
						</label>
						<div class="indicator" id="listening-indicator">
							<h3>Recording Audio</h3>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div class="talking control">
						<label for="toggle-talking" class="header">
							<h3>Talk</h3>
							<div class="controls-toggle-container">
								<input
									hidden
									id="toggle-talking"
									name="toggle-talking"
									type="checkbox"
								/>
								<label class="toggle" for="toggle-talking">
									<div class="toggle__circle"></div>
								</label>
							</div>
						</label>
						<div class="indicator" id="talking-indicator">
							<h3>Processing Image</h3>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div class="speech control" id="speech-container">
						<p id="generated-text-container" class="generated-text-container">
							<span>He/She said: </span>
							<span>"</span>
							<span id="generated-text">Hello...</span>
							<span>"</span>
						</p>
						<div class="buttons-container">
							<button class="clear-generated-text" id="clear-generated-text">
								Clear
							</button>
						</div>
					</div>
					<div class="signs control" id="signs-container">
						<p id="sign-text-container" class="sign-text-container">
							<span>You said: </span>
							<span>"</span>
							<span id="sign-text">Hello...</span>
							<span>"</span>
						</p>
						<div class="buttons-container">
							<button class="clear-sign-text" id="clear-sign-text">Clear</button>
							<button class="play-sign-text" id="play-sign-text">Play</button>
						</div>
					</div>
				</div>

				<footer>
					<div>
						<p>EchoLens | Smart Device - By Alpha-Amps</p>
					</div>
				</footer>
			</section>
		</body>
	</html>`;

	const cssCode = `
	/*
		HTML Structure Styling

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	*/
	
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;

		&::-webkit-scrollbar {
			width: 10px;
			padding: 1px;
			background: var(--back);

			display: none;
		}
		&::-webkit-scrollbar-thumb {
			width: 8px;
			border-radius: 8px;
			background: var(--second__back);
		}
	}

	body {
		--large: 16px;
		--medium: 14px;
		--small: 13px;

		--spacing: 20px;

		--back: #181818;
		--text: #efefef;
		--second__back: #272727;
		--second__text: #717171;
		--green: #2aa451;
		--red: #e6618c;
		--purple: #6d5fb4;

		font-family: Arial, Helvetica, sans-serif;
		background: var(--back);
		color: var(--text);
		font-size: var(--large);

		@media screen and (width <= 800px) {
			--spacing: 10px;

			font-size: var(--medium);
		}

		&.light {
			--back: #c3bdbd;
			--text: #181818;
			--second__back: #9d9999;
			--second__text: #272727;
		}

		.main {
			width: calc(100% - calc(var(--spacing) * 2));
			max-width: 1600px;
			margin-inline: auto;

			min-height: calc(100vh - calc(var(--spacing) * 2));
			margin-block: var(--spacing);

			background: var(--second__back);
			border-radius: var(--spacing);
			padding: var(--spacing);

			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			@media screen and (width <= 800px) {
				padding: calc(var(--spacing) * 1.5);
			}

			@media screen and (width <= 368px) {
				padding: var(--spacing);
			}

			.page-header {
				display: flex;
				flex-direction: column;
				gap: 3rem;

				.page-header__top {
					display: flex;
					align-items: start;
					justify-content: space-between;
					gap: 0.25rem;

					.slogan {
						text-align: left;
						background: linear-gradient(
							to bottom right,
							var(--second__text),
							var(--text),
							var(--second__text)
						);
						background-clip: text;
						color: transparent;
					}
				}

				.page-header__bottom {
					font-size: var(--large);

					display: flex;
					align-items: center;
					gap: 0.5rem;

					@media screen and (width <= 600px) {
						flex-direction: column;
						align-items: start;
					}

					.mode-toggle-container {
						margin-right: auto;
						display: flex;
						align-items: center;
						gap: 0.5rem;

						.toggle {
							width: 3rem;
							height: 22px;
							background: var(--red);
							border-radius: 11px;
							padding: 2px;
							cursor: pointer;
							display: flex;
							justify-content: start;
							transition: background 300ms 300ms;

							.toggle__circle {
								width: 18px;
								height: 18px;
								background: var(--text);
								border-radius: 50%;
								margin-left: 0.5px;
								transition: margin 500ms ease-in-out;
							}
						}

						#dark-light-mode:checked + .toggle {
							background: var(--green);

							& > .toggle__circle {
								margin-left: calc(3rem - 22px);
							}
						}

						p {
							font-weight: bold;
							background: linear-gradient(
								to bottom right,
								var(--second__text),
								var(--text),
								var(--second__text)
							);
							background-clip: text;
							color: transparent;
						}
					}

					.dt-container {
						display: flex;
						align-items: center;
						gap: 0.5rem;

						@media screen and (width <= 600px) {
							width: 100%;
							display: grid;
							grid-template-columns: repeat(2, 1fr);
						}

						@media screen and (width <= 300px) {
							grid-template-columns: repeat(1, 1fr);
							margin-block: 0.75rem;
						}

						#language-form {
							display: flex;
							align-items: center;
							gap: 0.75rem;
							div {
								display: flex;
								align-items: center;

								input,
								label {
									cursor: pointer;
									user-select: none;
								}
							}
						}

						#empty {
							@media screen and (width <= 300px) {
								display: none;
							}
						}

						span {
							background: var(--back);
							padding: 0.5rem 1rem;
							border-radius: 8px;
							user-select: none;

							@media screen and (width <= 600px) {
								text-align: center;
							}

							@media screen and (width <= 300px) {
								display: flex;
								align-items: center;
								justify-content: center;
								gap: 0.5rem;
							}

							small {
								font-size: var(--large);
								font-weight: bold;
								background: linear-gradient(
									to right,
									var(--red),
									var(--purple)
								);
								background-clip: text;
								color: transparent;

								@media screen and (width <= 348px) {
									display: block;
								}

								@media screen and (width <= 260px) {
									display: inline;
								}
							}
						}
					}
				}
			}

			.controls-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 0.5rem;

				@media screen and (width <= 600px) {
					grid-template-columns: 1fr;
				}

				.control {
					background: var(--back);
					border-radius: 8px;
					padding: 0.75rem;
					height: max-content;

					display: flex;
					flex-direction: column;
					gap: 0.5rem;

					.header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						cursor: pointer;
						user-select: none;

						h3 {
							background: linear-gradient(
								to bottom right,
								var(--second__text),
								var(--text),
								var(--second__text)
							);
							background-clip: text;
							color: transparent;
						}

						.controls-toggle-container {
							.toggle {
								width: 3rem;
								height: 22px;
								background: var(--red);
								border-radius: 11px;
								padding: 2px;
								cursor: pointer;
								display: flex;
								justify-content: start;
								transition: background 300ms 300ms;

								.toggle__circle {
									width: 18px;
									height: 18px;
									background: var(--text);
									border-radius: 50%;
									margin-left: 0.5px;
									transition: margin 500ms ease-in-out;
								}
							}
						}
					}

					.indicator {
						display: flex;
						align-items: center;
						user-select: none;

						h3 {
							color: var(--green);
							margin-right: 8px;
							font-size: var(--large);
						}

						span {
							display: inline;
							background: var(--green);
							margin-right: 3px;
							width: 4px;
							height: 4px;
							border-radius: 50%;
							animation: bounce 1s infinite ease-in-out;

							&:nth-child(1) {
								animation-delay: 0;
							}
							&:nth-child(2) {
								animation-delay: 0.2s;
							}
							&:nth-child(3) {
								animation-delay: 0.4s;
							}
							&:nth-child(4) {
								animation-delay: 0.6s;
							}
							&:nth-child(5) {
								animation-delay: 0.8s;
							}
						}
					}
				}

				.speech.control,
				.signs.control {
					grid-column: 1 / -1;

					p {
						span {
							&:nth-child(1) {
								color: var(--second__text);
								font-weight: 700;
								text-decoration: underline;
								text-decoration-thickness: 2px;
								text-underline-offset: 2px;
							}
							&:nth-child(3) {
								color: var(--text);
							}
							&:nth-child(2),
							&:nth-child(4) {
								color: var(--red);
							}
						}
					}

					.buttons-container {
						display: flex;
						align-items: center;
						gap: 0.25rem;
						margin-left: auto;

						button {
							outline: none;
							border: 0;
							background: var(--second__back);
							color: var(--text);
							font-size: var(--medium);
							width: max-content;
							padding: 0.35rem 1.5rem;
							border-radius: 8px;
							cursor: pointer;

							&:hover {
								text-decoration: underline;
							}
						}
					}
				}

				#toggle-listening:checked + .toggle {
					background: var(--green);

					& > .toggle__circle {
						margin-left: calc(3rem - 22px);
					}
				}
				#toggle-talking:checked + .toggle {
					background: var(--green);

					& > .toggle__circle {
						margin-left: calc(3rem - 22px);
					}
				}
			}

			footer {
				width: 100%;
				max-width: 600px;
				text-align: center;
				margin-top: auto;
				padding-top: 3rem;
				margin-inline: auto;

				display: flex;
				flex-direction: column;
				align-items: center;

				div {
					background: var(--back);
					border-radius: var(--small);
					padding: 0.75rem 1.25rem;

					p {
						width: 100%;
						max-width: max-content;
						font-size: var(--medium);
						font-weight: bold;
						background: linear-gradient(
							to right,
							var(--red),
							var(--purple),
							var(--red)
						);
						background-clip: text;
						color: transparent;
						user-select: none;
					}
				}
			}
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-3px);
		}
		50% {
			transform: translateY(6px);
		}
	}`;

	const jsCode = `
	/*
		Main JavaScript Program

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	*/
	
	document.onreadystatechange = function () {
		if (document.readyState == "complete") {
			//* ========================================================================================= *//
			const languageForm = document.getElementById("language-form");
			let selectedLanguage = "EN";
			const speechLanguages = { EN: "en-US", FR: "fr-FR", AR: "ar-SA" };

			//===>
			const listeningCheckbox = document.getElementById("toggle-listening");
			const listeningIndicator = document.getElementById(
				"listening-indicator"
			);

			//===>
			const talkingCheckbox = document.getElementById("toggle-talking");
			const talkingIndicator = document.getElementById("talking-indicator");

			//===>
			const speechContainer = document.getElementById("speech-container");
			const generatedTextContainer =
				document.getElementById("generated-text");
			const clearGeneratedTextBtn = document.getElementById(
				"clear-generated-text"
			);
			let generatedText = "";
			let recognition = null;

			//===>
			const signsContainer = document.getElementById("signs-container");
			const signTextContainer = document.getElementById("sign-text");
			const clearSignTextBtn = document.getElementById("clear-sign-text");
			const playSignTextBtn = document.getElementById("play-sign-text");
			let signText = "";

			//===>
			const toggleDarkLightMode =
				document.getElementById("dark-light-mode");
			const currentMode = document.getElementById("dark-light-curr-mode");

			//* ========================================================================================= *//
			handleSelectedLanguage();
			languageForm.addEventListener("change", handleSelectedLanguage);

			//===>
			setUpSpeech(speechLanguages[selectedLanguage]);
			handleShowText(generatedText);
			handleToggleListening(0);
			handleCheckboxChange(listeningCheckbox, listeningIndicator);
			listeningCheckbox.addEventListener("change", () => {
				handleCheckboxChange(listeningCheckbox, listeningIndicator);

				talkingCheckbox.checked = false;
				handleCheckboxChange(talkingCheckbox, talkingIndicator);

				if (listeningCheckbox.checked) {
					console.log("Stoped Talking.");
					handleToggleTalking(0);

					generatedText = "";
					handleShowText(generatedText);
					console.log("Listening...");
					handleToggleListening(1);
					recognition.start();
				} else {
					console.log("Stoped Listening.");
					handleToggleListening(0);
					recognition.stop();
				}
			});

			//===>
			handleToggleTalking(0);
			handleCheckboxChange(talkingCheckbox, talkingIndicator);
			talkingCheckbox.addEventListener("change", () => {
				handleCheckboxChange(talkingCheckbox, talkingIndicator);

				listeningCheckbox.checked = false;
				handleCheckboxChange(listeningCheckbox, listeningIndicator);

				if (talkingCheckbox.checked) {
					console.log("Stoped Listening.");
					handleToggleListening(0);
					recognition.stop();

					console.log("Talking...");
					handleToggleTalking(1);
				} else {
					console.log("Stoped Talking.");
					handleToggleTalking(0);
				}
			});

			//===>
			clearGeneratedTextBtn.addEventListener("click", () => {
				console.log("Text cleared");
				generatedText = "";
				handleShowText(generatedText);
			});

			//===>
			handleShowSignText(signText);
			clearSignTextBtn.addEventListener("click", () => {
				console.log("Text cleared");
				signText = "";
				handleShowSignText(signText);
			});
			playSignTextBtn.addEventListener("click", () => {
				playSignText();
			});

			//===>
			toggleDarkLightMode.addEventListener("change", () => {
				document.body.classList.toggle("light");

				if (document.body.classList.contains("light")) {
					currentMode.innerText = "Light";
				} else {
					currentMode.innerText = "Dark";
				}
			});

			//===>
			process();

			//* ========================================================================================= *//
			function handleSelectedLanguage() {
				let xhttp = new XMLHttpRequest();
				const selectedLanguageInput = document.querySelector(
					'input[name="language"]:checked'
				);

				selectedLanguage = selectedLanguageInput.value;
				xhttp.open(
					"PUT",
					"GET_SELECTED_LANG?lang=" + selectedLanguage,
					false
				);
				xhttp.send();
			}

			function setUpSpeech(lang) {
				recognition = new webkitSpeechRecognition();
				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.lang = lang;

				return new Promise((resolve, reject) => {
					recognition.onresult = function (event) {
						let interimTranscript = "";
						let finalTranscript = "";

						for (let i = event.resultIndex; i < event.results.length; ++i) {
							const transcript = event.results[i][0].transcript;

							if (event.results[i].isFinal) {
								finalTranscript += transcript;
							} else {
								interimTranscript += transcript;
							}
						}

						generatedText = finalTranscript;
						handleShowText(generatedText);
					};

					recognition.onerror = function (event) {
						console.error("Speech recognition error: ", event.error);
						listeningCheckbox.checked = false;
						handleCheckboxChange(listeningCheckbox, listeningIndicator);
						handleToggleListening(0);
						reject(event.error);
					};

					recognition.onend = function () {
						console.log("Speech recognition ended.");
						listeningCheckbox.checked = false;
						handleToggleListening(0);
						handleCheckboxChange(listeningCheckbox, listeningIndicator);
					};

					resolve();
				});
			}

			function playSignText() {
				if (signText && signText !== "_BLANK_") {
					const synth = window.speechSynthesis;
					const utterance = new SpeechSynthesisUtterance(signText);
					utterance.lang = speechLanguages[selectedLanguage];
					synth.speak(utterance);
				}
			}

			function handleShowText(generatedText) {
				if (generatedText) {
					generatedTextContainer.innerText = generatedText;
					speechContainer.style.display = "flex";
				} else {
					speechContainer.style.display = "none";
				}
			}
			function handleShowSignText(signText) {
				if (signText && signText !== "_BLANK_") {
					signTextContainer.innerText = signText;
					signsContainer.style.display = "flex";
				} else {
					signsContainer.style.display = "none";
				}
			}

			function handleToggleListening(listeningState) {
				let xhttp = new XMLHttpRequest();
				xhttp.open(
					"PUT",
					"TOGGLE_LISTENING?state=" + listeningState,
					false
				);
				xhttp.send();
			}
			function handleToggleTalking(talkingState) {
				let xhttp = new XMLHttpRequest();
				xhttp.open("PUT", "TOGGLE_TALKING?state=" + talkingState, false);
				xhttp.send();
			}

			function hide(el) {
				el.style.display = "none";
			}
			function show(el) {
				el.style.display = "flex";
			}
			function handleCheckboxChange(checkboxEl, el) {
				if (checkboxEl.checked) {
					show(el);
				} else {
					hide(el);
				}
			}

			function updateDateTime() {
				const dateContainer = document.getElementById("date-container");
				const timeContainer = document.getElementById("time-container");
				const dt = new Date();

				dateContainer.innerHTML = "<small>Date:</small> {dt.toLocaleDateString()}";
				timeContainer.innerHTML = "<small>Time:</small> {dt.toLocaleTimeString(
					"en-US",
					{ hour12: false }
				)}";
			}
			function response() {
				if (talkingCheckbox.checked) {
					fetch("http://192.168.169.196/SEND_TEXT_SIGN")
						.then((resu) => resu.text())
						.then((data) => {
							signText = data;
							handleShowSignText(signText);
						});
				}
			}
			function process() {
				updateDateTime();
				response();
				setTimeout(process, 40);
			}
		}
	};`;

	return (
		<div id={id} className="mt-8">
			<Link
				href={`#${id}`}
				className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
			>
				{title}{" "}
				<LinkIcon
					size={20}
					className="inline text-secondary group-hover:text-purple transition-all"
				/>
			</Link>
			<p className="text-small mb-3">
				{description_s}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					&rdquo; Listen Mode &rdquo;
				</span>
				{description_m}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					&rdquo; Talk Mode &rdquo;
				</span>
				{description_e}
			</p>
			<div className="grid grid-cols-1 gap-2">
				{images.map((image, i) => (
					<div key={`image-${i}`}>
						<Image
							src={image}
							width={1200}
							height={400}
							draggable="false"
							alt={`${title} - ${i}`}
							className="w-full rounded-sm object-cover"
						/>
					</div>
				))}
			</div>
			<SimplifiedCode
				props={{
					githubLink:
						"https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main",
					language: "html",
					code: htmlCode,
				}}
			/>
			<SimplifiedCode
				props={{
					githubLink:
						"https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main",
					language: "css",
					code: cssCode,
				}}
			/>
			<SimplifiedCode
				props={{
					githubLink:
						"https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main",
					language: "javascript",
					code: jsCode,
				}}
			/>
			<p className="text-small mt-2">{note}</p>
			<p className="text-small mt-2">{conclusion}</p>
			<RedirectLink
				link="https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main"
				text="Github - EchoLens"
			/>
		</div>
	);
};

export const Integration = ({ props: { id, title, description } }) => {
	return (
		<div id={id} className="mt-8">
			<Link
				href={`#${id}`}
				className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
			>
				{title}{" "}
				<LinkIcon
					size={20}
					className="inline text-secondary group-hover:text-purple transition-all"
				/>
			</Link>
			<p className="text-small mb-3">{description}</p>
		</div>
	);
};

export const Testing = ({ props: { id, title, description } }) => {
	return (
		<div id={id} className="mt-8">
			<Link
				href={`#${id}`}
				className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
			>
				{title}{" "}
				<LinkIcon
					size={20}
					className="inline text-secondary group-hover:text-purple transition-all"
				/>
			</Link>
			<p className="text-small mb-3">{description}</p>
			<video controls autoPlay={false} className="w-full rounded-sm">
				<source src="/projects/echolens/demo.mp4" />
			</video>
		</div>
	);
};

export const Conclusion = ({ props: { title, descriptions } }) => {
	return (
		<div className="mt-8">
			<h1 className="text-medium mb-2 font-[500]">{title}</h1>
			<p className="text-small">{descriptions[0]}</p>
			<p className="text-medium mb-3 bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold w-full max-w-max">
				{descriptions[1]}
			</p>
		</div>
	);
};
