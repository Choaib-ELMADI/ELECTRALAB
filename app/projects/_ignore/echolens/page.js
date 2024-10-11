import HeaderImage from "@/public/projects/echolens/header.png";
import PorfileImage from "@/public/profile.jpg";

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import SimplifiedCode from "@/components/utils/simplified-code";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";

import {
	AIModel,
	DesignStep,
	Integration,
	Conclusion,
	Introduction,
	Steps,
	Testing,
	WebInterfaceSetup,
	RedirectLink,
} from "./utils";

const mainCppCode = `
	/*
		Main.ino Program

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	*/

	#include "camera_index.h"
	#include "camera_pins.h"
	#include "esp_camera.h"
	#include <WebServer.h>
	#include <WiFi.h>

	bool DEBUGGING = true;

	const char *ssid = "Choaibs-Phone";
	const char *password = "devchoaib";

	bool isListening = false;
	bool isTalking = false;
	String signTextData = "_BLANK_";
	String selectedLang = "EN";
	unsigned long lastDataMillis = 0;
	const uint8_t delayTime = 250;

	const uint8_t listeningLED = 14;
	const uint8_t talkingLED = 2;
	const long listeningLEDInterval = 250;
	const long talkingLEDInterval = 250;
	unsigned long previousMillisArray[2] = {0, 0};
	bool ledStateArray[2] = {LOW, LOW};

	WebServer server(80);

	void setupCamera();
	camera_config_t setupConfiguration();
	void connectToWiFi();
	void startCameraServer();

	/**********************************/
	/*             MAIN               */
	/**********************************/
	void setup() {
		pinMode(listeningLED, OUTPUT);
		pinMode(talkingLED, OUTPUT);
		digitalWrite(listeningLED, HIGH);
		digitalWrite(talkingLED, HIGH);

		Serial.begin(115200);

		setupCamera();
		Serial.println("Done setup camera.");

		connectToWiFi();
		Serial.println("Done connect WiFi.");

		server.on("/", sendMainPage);
		server.on("/GET_TEXT_SIGN", getTextSign);        // Get text from Py
		server.on("/SEND_TEXT_SIGN", sendTextSign);      // Send text to JS
		server.on("/TOGGLE_LISTENING", toggleListening); // Toggle listening
		server.on("/TOGGLE_TALKING", toggleTalking);     // Toggle talking
		server.on("/IS_TALKING", sendTalkingState);      // Send talking state to Py
		server.on("/GET_SELECTED_LANG", getSelectedLang);   // Get lang from JS
		server.on("/SEND_SELECTED_LANG", sendSelectedLang); // Send lang to Py

		server.begin();

		digitalWrite(listeningLED, LOW);
		digitalWrite(talkingLED, LOW);
	}
	void loop() {
		if (millis() - lastDataMillis >= delayTime) {
			lastDataMillis = millis();

			if (isListening) {
				blinkLED(listeningLED, listeningLEDInterval, 0);
				// digitalWrite(talkingLED, LOW);
			} else {
				digitalWrite(listeningLED, LOW);
			}

			if (isTalking) {
				blinkLED(talkingLED, talkingLEDInterval, 1);
				// digitalWrite(listeningLED, LOW);
			} else {
				digitalWrite(talkingLED, LOW);
			}

			if (DEBUGGING) {
				printData();
			}
		}

		server.handleClient();
	}

	/**********************************/
	/*         WIFI & CAMERA          */
	/**********************************/
	void setupCamera() {
		camera_config_t config = setupConfiguration();

		esp_err_t err = esp_camera_init(&config);
		if (err != ESP_OK) {
			Serial.printf("Camera init failed with error 0x%x", err);
			return;
		}

		sensor_t *s = esp_camera_sensor_get();
		s->set_framesize(s, FRAMESIZE_VGA);
	}
	camera_config_t setupConfiguration() {
		camera_config_t config;

		config.ledc_channel = LEDC_CHANNEL_0;
		config.ledc_timer = LEDC_TIMER_0;
		config.pin_d0 = Y2_GPIO_NUM;
		config.pin_d1 = Y3_GPIO_NUM;
		config.pin_d2 = Y4_GPIO_NUM;
		config.pin_d3 = Y5_GPIO_NUM;
		config.pin_d4 = Y6_GPIO_NUM;
		config.pin_d5 = Y7_GPIO_NUM;
		config.pin_d6 = Y8_GPIO_NUM;
		config.pin_d7 = Y9_GPIO_NUM;
		config.pin_xclk = XCLK_GPIO_NUM;
		config.pin_pclk = PCLK_GPIO_NUM;
		config.pin_vsync = VSYNC_GPIO_NUM;
		config.pin_href = HREF_GPIO_NUM;
		config.pin_sccb_sda = SIOD_GPIO_NUM;
		config.pin_sccb_scl = SIOC_GPIO_NUM;
		config.pin_pwdn = PWDN_GPIO_NUM;
		config.pin_reset = RESET_GPIO_NUM;
		config.xclk_freq_hz = 10000000;
		config.frame_size = FRAMESIZE_VGA;
		config.pixel_format = PIXFORMAT_JPEG;
		config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
		config.fb_location = CAMERA_FB_IN_PSRAM;
		config.jpeg_quality = 16;
		config.fb_count = 1;

		return config;
	}
	void connectToWiFi() {
		WiFi.begin(ssid, password);
		WiFi.setSleep(false);

		while (WiFi.status() != WL_CONNECTED) {
			delay(500);
			Serial.print(".");
		}
		Serial.println("");
		Serial.println("WiFi connected");

		startCameraServer();

		Serial.print("Camera Ready! Use 'http://");
		Serial.print(WiFi.localIP());
		Serial.println("' to connect");
	}

	/**********************************/
	/*          DEBUGINNING           */
	/**********************************/
	void printData() {
		Serial.print("Listening: ");
		Serial.print(isListening);

		Serial.print(", Talking: ");
		Serial.print(isTalking);

		Serial.print(", data: ");
		Serial.print(signTextData);

		Serial.print(", lang: ");
		Serial.println(selectedLang);
	}

	/**********************************/
	/*        RENDER WEBPAGE          */
	/**********************************/
	void sendMainPage() { server.send(200, "text/html", htmlWebPage); }

	/**********************************/
	/*      COMMUNICATION HERE        */
	/**********************************/
	void toggleListening() {
		String listeningState = server.arg("state");
		isListening = listeningState.toInt();
		server.send(200, "text/plain", "");
	}
	void toggleTalking() {
		String talkingState = server.arg("state");
		isTalking = talkingState.toInt();
		server.send(200, "text/plain", "");
	}
	void getTextSign() {
		signTextData = server.arg("signs");
		server.send(200, "text/plain", "");
	}
	void sendTextSign() { server.send(200, "text/plain", signTextData); }
	void sendTalkingState() { server.send(200, "text/plain", String(isTalking)); }
	void getSelectedLang() {
		selectedLang = server.arg("lang");
		server.send(200, "text/plain", "");
	}
	void sendSelectedLang() { server.send(200, "text/plain", selectedLang); }

	/**********************************/
	/*         FUNCTIONS HERE         */
	/**********************************/
	void blinkLED(uint8_t ledPin, long interval, uint8_t ledIndex) {
		if (millis() - previousMillisArray[ledIndex] >= interval) {
			previousMillisArray[ledIndex] = millis();

			if (ledStateArray[ledIndex] == LOW)
				ledStateArray[ledIndex] = HIGH;
			else
				ledStateArray[ledIndex] = LOW;

			digitalWrite(ledPin, ledStateArray[ledIndex]);
		}
	}`;

const mainPythonCode = `
	'''
		main.py Program

		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/echolens/
	'''

	# ====>
	import sign_language_model
	import mediapipe as mp
	import numpy as np
	import requests
	import cvzone
	import cv2

	# ====>
	print("Loaded.")

	# ====>
	mp_drawing_styles = mp.solutions.drawing_styles  # type: ignore
	mp_drawing = mp.solutions.drawing_utils  # type: ignore
	mp_hands = mp.solutions.hands  # type: ignore
	hands = mp_hands.Hands(max_num_hands=1)

	# ====>
	url = "http://192.168.169.196"
	get_talking_state_url = f"{ url }/IS_TALKING"
	get_lang_url = f"{ url }/SEND_SELECTED_LANG"
	gesture = "_BLANK_"
	selected_lang = "EN"
	list_message = []
	text_message = ""
	is_talking = False
	is_end_of_phrase = False

	# ====>
	text_background = (198, 63, 88)  # PURPLE
	corner_color = (53, 53, 249)  # RED
	text_color = (239, 239, 239)  # WHITE
	border_color = (61, 147, 8)  # GREEN

	# ====>
	stream_url = f"{ url }:81/stream"
	my_cap = cv2.VideoCapture(0)
	cap = cv2.VideoCapture(stream_url)

	counter = 0
	while True:
		# ====>
		_, frame = cap.read()
		frame_copy = np.copy(frame)
		frame_copy = cv2.cvtColor(frame_copy, cv2.COLOR_BGR2RGB)
		frame = cv2.resize(frame, (400, 300))

		_, my_frame = my_cap.read()
		my_frame = cv2.resize(my_frame, (400, 300))

		# ====>
		get_talking_response = requests.get(get_talking_state_url)
		if get_talking_response.status_code == 200:
			is_talking = get_talking_response.json()

		# ====>
		if is_talking:
			get_lang_response = requests.get(get_lang_url)
			if get_lang_response.status_code == 200:
				selected_lang = get_lang_response.text

			hand_keypoints = np.zeros(21 * 2)
			results = hands.process(frame_copy)

			if results.multi_hand_landmarks:
				for hand_landmarks in results.multi_hand_landmarks:
					mp_drawing.draw_landmarks(
						image=frame,
						landmark_list=hand_landmarks,
						connections=mp_hands.HAND_CONNECTIONS,
					)

				hand_keypoints = np.array(
					[
						[landmark.x, landmark.y]
						for landmark in results.multi_hand_landmarks[0].landmark
					]
				).flatten()

			if counter % 30 == 0:
				gesture = sign_language_model.predict_hand_gesture(
					hand_keypoints, selected_lang
				)

			if gesture != "_BLANK_" and gesture not in list_message:
				if gesture == ".":
					is_end_of_phrase = True

				list_message.append(gesture)

				if len(list_message) > 0 and list_message[0] == ".":
					list_message.pop(0)

		# ====>
		text_message = " ".join(list_message).strip()
		image_text_message = " ".join(list_message[-4:]).strip()
		if image_text_message and image_text_message != ".":
			cvzone.putTextRect(
				frame,
				f"{image_text_message}",
				pos=(30, 50),
				scale=1,
				thickness=1,
				colorT=text_color,
				colorR=text_background,
				font=cv2.FONT_HERSHEY_COMPLEX_SMALL,
				offset=8,
				border=1,
				colorB=text_color,
			)
		cv2.imshow("Frame", frame)
		cv2.imshow("Me", my_frame)

		# ====>
		if is_end_of_phrase:
			if text_message and text_message != ".":
				post_url = f"{url}/GET_TEXT_SIGN?signs={text_message}"
				post_response = requests.post(post_url)
				if post_response.status_code == 200:
					list_message = []
					text_message = ""
					image_text_message = ""
					is_end_of_phrase = False

		# ====>
		counter += 1
		key = cv2.waitKey(1) & 0xFF
		if key == ord("c"):
			list_message = []
			text_message = ""
		if key == ord("q"):
			break

	# ====>
	cap.release()
	my_cap.release()
	cv2.destroyAllWindows()`;

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
						<Steps />
					</>

					<>
						<DesignStep
							props={{
								id: "frame-design-3d-print",
								title: "Frame Design and 3D Printing",
								description:
									"In this step, we design the EchoLens frame using Solidworks to fit the ESP32-CAM, battery, and other essential components. After crafting a detailed 3D model, we optimize the design for 3D printing, selecting suitable materials and print settings to ensure durability and functionality. Finally, we print the frame, creating the physical structure needed for assembling the EchoLens smart glasses.",
								images: [
									"/projects/echolens/1.jpg",
									"/projects/echolens/2.jpg",
									"/projects/echolens/3.jpg",
									"/projects/echolens/4.jpg",
									"/projects/echolens/5.jpg",
								],
								conclusion:
									"You can download all the 3D designs from our Thangs profile or GitHub repository for your convenience.",
								links: [
									{
										link: "https://github.com/Choaib-ELMADI/echolens/tree/main/3D%20Models",
										text: "Github - 3D Models",
									},
									{
										link: "https://thangs.com/designer/Choaib%20ELMADI",
										text: "Thangs Profile",
									},
								],
							}}
						/>

						<DesignStep
							props={{
								id: "pcb-development",
								title: "PCB Development",
								description:
									"In this step, we design a custom PCB layout using Altium Designer to integrate all the electronic components required for EchoLens. Once the design is finalized, we send the PCB layout to a fabrication service like PCBway to produce the physical board. After receiving the fabricated PCB, we proceed with soldering and assembling the electronic components onto the board, ensuring all connections are secure and functional.",
								images: [
									"/projects/echolens/11.jpg",
									"/projects/echolens/12.jpg",
									"/projects/echolens/13.jpg",
								],
								conclusion:
									"All PCB design files, including Gerber files, are available for download from our GitHub repository.",
								links: [
									{
										link: "https://github.com/Choaib-ELMADI/echolens/tree/main/Circuit%20Diagram/ESP32-CAM%20PCB%20Shield",
										text: "Github - Gerber Files",
									},
								],
							}}
						/>
					</>

					<>
						<AIModel
							props={{
								id: "ai-model",
								title: "AI Model for Sign Language",
							}}
						/>
					</>

					<>
						<WebInterfaceSetup
							props={{
								id: "web-interface-setup",
								title: "Web Interface Setup",
								description_s:
									"In this step, we set up a web interface to support the functionalities of EchoLens. The web page is served by the ESP32-CAM and provides an intuitive interface for users. We implement two key features: ",
								description_m:
									", which captures and converts speech to text displayed on the interface, and ",
								description_e:
									", which processes and translates sign language gestures into spoken words. This web interface ensures seamless interaction and accessibility for users.",
								images: [
									"/projects/echolens/webpage__dark.png",
									"/projects/echolens/webpage__light.png",
								],
								note: "Note that, both the CSS code and the JavaScript code should be inside the same HTML file.",
								conclusion:
									"All web interface code is available for download from our GitHub repository.",
							}}
						/>
					</>

					<>
						<Integration
							props={{
								id: "integration-and-testing",
								title: "Integration",
								description:
									"In this step, we integrate all components of the EchoLens system and perform thorough testing to ensure functionality and reliability. This involves combining the frame, PCB, AI model, and web interface into a cohesive unit. The main C++ program on the ESP32-CAM handles data capture and communication, while the main Python code manages the AI model's processing and interpretation of sign language gestures.",
							}}
						/>
						<SimplifiedCode
							props={{
								githubLink:
									"https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main",
								code: mainCppCode,
								language: "cpp",
							}}
						/>
						<SimplifiedCode
							props={{
								githubLink:
									"https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main",
								code: mainPythonCode,
								language: "python",
							}}
						/>
						<RedirectLink
							link="https://github.com/Choaib-ELMADI/echolens/tree/main/Programs/Main"
							text="More Details Here"
						/>
					</>

					<>
						<Testing
							props={{
								id: "integration-and-testing",
								title: "Testing",
								description:
									"After integrating these elements, we conduct extensive testing to verify that the speech-to-text and sign language translation features work accurately and smoothly. This process includes debugging, performance optimization, and validating the interaction between hardware and software.",
							}}
						/>
					</>

					<>
						<Conclusion
							props={{
								title: "Conclusion",
								descriptions: [
									"Congratulations on completing the EchoLens project! We've successfully designed, assembled, and tested smart glasses that enhance communication for the deaf and mute. Use this experience to keep exploring and innovating in assistive technology.",
									"Keep exploring, learning, and creating!",
								],
							}}
						/>
					</>

					<>
						<NavigateToOtherProjects
							props={{
								prev: "/projects/mini-balance-robot",
								prevTitle: "Mini Balance Robot",
								next: "/",
								nextTitle: "Home",
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
