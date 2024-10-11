import HeaderImage from "@/public/projects/mini-balance-robot/header.png";
import PorfileImage from "@/public/profile.jpg";

const mpu6050CalibrationCode = `
	/*
		MPU-6050 Calibration Code
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/mini-balance-robot
	*/

	#include "I2Cdev.h"
	#include "MPU6050_6Axis_MotionApps20.h"

	#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
		#include "Wire.h"
	#endif

	MPU6050 mpu;
	uint8_t devStatus;

	void setup() {
		#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
			Wire.begin();
			Wire.setClock(400000);
		#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
			Fastwire::setup(400, true);
		#endif

		Serial.begin(115200);
		while (!Serial);

		// initialize device
		Serial.println(F("Initializing I2C devices..."));
		mpu.initialize();

		// verify connection
		Serial.println(F("Testing device connections..."));
		Serial.println(mpu.testConnection() ? F("MPU6050 connection successful") : F("MPU6050 connection failed"));

		// wait for ready
		Serial.println(F("Send any character to begin DMP programming and demo: "));
		while (Serial.available() && Serial.read()); // empty buffer
		while (!Serial.available());                 // wait for data
		while (Serial.available() && Serial.read()); // empty buffer again

		// load and configure the DMP
		Serial.println(F("Initializing DMP..."));
		devStatus = mpu.dmpInitialize();

		// make sure it worked (returns 0 if so)
		if (devStatus == 0) {
			// Calibration Time: generate offsets and calibrate our MPU6050
			mpu.CalibrateAccel(6);
			mpu.CalibrateGyro(6);
			mpu.PrintActiveOffsets();
		}
	}

	void loop() {
	}

`;
const mainCodeImplementation = `
	/*
		Mini Balance Robot Code
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   https://github.com/Choaib-ELMADI/mini-balance-robot
	*/

	#include "PID_v1.h"


	//****************************
	//       Set Up MPU6050      *
	//****************************

	#include "I2Cdev.h"
	#include "MPU6050_6Axis_MotionApps20.h"

	#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
		#include "Wire.h"
	#endif

	MPU6050 mpu;
	
	#define INTERRUPT_PIN 2

	bool dmpReady = false;
	uint8_t mpuIntStatus;
	uint8_t devStatus;
	uint16_t packetSize;
	uint16_t fifoCount;
	uint8_t fifoBuffer[64];

	Quaternion q;
	VectorFloat gravity;
	float ypr[3];
	VectorInt16 gy;

	volatile bool mpuInterrupt = false;
	void dmpDataReady() {
		mpuInterrupt = true;
	}


	//***************************
	//         PID Control      *
	//***************************

	#define PID_MIN_LIMIT -255
	#define PID_MAX_LIMIT 255
	#define PID_SAMPLE_TIME_IN_MILLI 10

	#define SETPOINT_PITCH_ANGLE_OFFSET .9 // -2.2   

	#define MIN_ABSOLUTE_SPEED 0

	double setpointPitchAngle = SETPOINT_PITCH_ANGLE_OFFSET;
	double pitchGyroAngle = 0;
	double pitchPIDOutput = 0;

	double setpointYawRate = 0;
	double yawGyroRate = 0;
	double yawPIDOutput = 0;

	#define PID_PITCH_KP 10 // 10
	#define PID_PITCH_KI 50 // 80 
	#define PID_PITCH_KD .6 // .8

	#define PID_YAW_KP 0
	#define PID_YAW_KI 0
	#define PID_YAW_KD 0

	PID pitchPID(&pitchGyroAngle, &pitchPIDOutput, &setpointPitchAngle, PID_PITCH_KP, PID_PITCH_KI, PID_PITCH_KD, DIRECT);
	PID yawPID(&yawGyroRate, &yawPIDOutput, &setpointYawRate, PID_YAW_KP, PID_YAW_KI, PID_YAW_KD, DIRECT);


	//***************************
	//       Set Up DC Motors   *
	//***************************

	// Motor A: ==> RIGHT
	const int IN1 = 7, IN2 = 8;
	const int ENA = 9;

	// Motor B: ==> LEFT
	const int IN3 = 12, IN4 = 11;
	const int ENB = 10;

	void setupPID() {
		pitchPID.SetOutputLimits(PID_MIN_LIMIT, PID_MAX_LIMIT);
		pitchPID.SetMode(AUTOMATIC);
		pitchPID.SetSampleTime(PID_SAMPLE_TIME_IN_MILLI);

		yawPID.SetOutputLimits(PID_MIN_LIMIT, PID_MAX_LIMIT);
		yawPID.SetMode(AUTOMATIC);
		yawPID.SetSampleTime(PID_SAMPLE_TIME_IN_MILLI);
	}

	void setupMotors() {
		pinMode(IN1, OUTPUT);
		pinMode(IN2, OUTPUT);
		pinMode(IN3, OUTPUT);
		pinMode(IN4, OUTPUT);
		pinMode(ENA, OUTPUT);
		pinMode(ENB, OUTPUT);

		rotateMotor(0, 0);
	}

	void setupMPU() {
		#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
			Wire.begin();
			Wire.setClock(400000);
		#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
			Fastwire::setup(400, true);
		#endif
	
		mpu.initialize();
		pinMode(INTERRUPT_PIN, INPUT);
		devStatus = mpu.dmpInitialize();


		// Utilize the six printed values visible in the Serial Monitor below:
		mpu.setXAccelOffset(-234);			// Value 1
		mpu.setYAccelOffset(1763);			// Value 2
		mpu.setZAccelOffset(536);   		// Value 3
		mpu.setXGyroOffset(154);			// Value 4
		mpu.setYGyroOffset(67);				// Value 5
		mpu.setZGyroOffset(43);				// Value 6
		
		if (devStatus == 0) {
			// mpu.CalibrateAccel(6);
			// mpu.CalibrateGyro(6);
			
			mpu.setDMPEnabled(true);
			mpuIntStatus = mpu.getIntStatus();
			dmpReady = true;
			
			packetSize = mpu.dmpGetFIFOPacketSize();
		}
	}

	void setup() {
		Serial.begin(115200);
		
		pinMode(LED_BUILTIN, OUTPUT);
		digitalWrite(LED_BUILTIN, HIGH);
		
		setupMotors();
	
		setupMPU();
	
		setupPID();

		digitalWrite(LED_BUILTIN, LOW);
	}

	void loop() {
		if (!dmpReady) return;

		if (mpu.dmpGetCurrentFIFOPacket(fifoBuffer)) {  
			mpu.dmpGetQuaternion(&q, fifoBuffer);
			mpu.dmpGetGravity(&gravity, &q);
			mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
			mpu.dmpGetGyro(&gy, fifoBuffer);

			yawGyroRate = gy.z;
			pitchGyroAngle = ypr[1] * 180/M_PI;
			Serial.println(pitchGyroAngle);

			if (pitchGyroAngle >= 40 || pitchGyroAngle <= -40) {
				digitalWrite(ENA, LOW);
				digitalWrite(IN1, LOW);
				digitalWrite(IN2, LOW);
				
				digitalWrite(ENB, LOW);
				digitalWrite(IN3, LOW);
				digitalWrite(IN4, LOW);

				return;
			}

			pitchPID.Compute();
			yawPID.Compute();

			rotateMotor(pitchPIDOutput+yawPIDOutput, pitchPIDOutput-yawPIDOutput);
		}
	}

	void rotateMotor(int speed1, int speed2) {
		if (speed1 <= 0) {
			digitalWrite(IN1, LOW);
			digitalWrite(IN2, HIGH);    
		}
		else if (speed1 > 0) {
			digitalWrite(IN1, HIGH);
			digitalWrite(IN2, LOW);      
		}

		if (speed2 <= 0) {
			digitalWrite(IN3, LOW);
			digitalWrite(IN4, HIGH);    
		}
		else if (speed2 > 0) {
			digitalWrite(IN3, HIGH);
			digitalWrite(IN4, LOW);      
		}
	
		speed1 = abs(speed1) + MIN_ABSOLUTE_SPEED;
		speed2 = abs(speed2) + MIN_ABSOLUTE_SPEED;

		speed1 = constrain(speed1, MIN_ABSOLUTE_SPEED, 255);
		speed2 = constrain(speed2, MIN_ABSOLUTE_SPEED, 255);
		
		analogWrite(ENA, speed1);
		analogWrite(ENB, speed2);    
	}

`;

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import {
	SetUpEnvironment,
	CircuitDiagram,
	AssembleParts,
	RobotModeling,
	Introduction,
	Steps,
	VideoDemonstration,
	Conclusion,
} from "./utils";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";
import Code from "@/components/utils/code";

export default function MiniBalanceRobot() {
	return (
		<div className="w-full max-w-[1200px] mx-auto">
			<Header
				props={{
					banner: HeaderImage,
					profile: PorfileImage,
					title: "Arduino: Mini Balance Robot",
					link: "https://elmadichoaib.vercel.app",
					user: "Choaib ELMADI",
				}}
			/>
			<div className="grid grid-cols-1 dm:grid-cols-[auto_300px] gap-1">
				<div className="overflow-hidden">
					<>
						<Introduction />
						<Steps />
						<SetUpEnvironment id="project-environment" />
					</>

					<>
						<RobotModeling
							props={{
								id: "project-3d-models",
								title: "MBR 3D Models",
								description:
									"Let's begin by giving shape to our mini balance robot in the digital world! I've created 3D models that represent every part of our robot. These models are like digital maps showing how each piece fits together. Click the links below to download and see these models. They're the starting point of our project, showing us how our robot will look and how its parts connect.",
								images: [
									"/projects/mini-balance-robot/3d-model-1.png",
									"/projects/mini-balance-robot/3d-model-2.png",
									"/projects/mini-balance-robot/3d-model-3.png",
								],
							}}
						/>
					</>

					<>
						<CircuitDiagram
							props={{
								id: "project-circuit",
								title: "Schematic Overview",
								description:
									"Understanding the schematic is pivotal in comprehending the intricate workings of our project. This section provides a detailed overview of the circuitry and connections, unraveling the blueprint behind the magic of our creation.",
								images: [
									"/projects/mini-balance-robot/mbr-circuit.png",
									"/projects/mini-balance-robot/mpu6050-wiring.png",
									"/projects/mini-balance-robot/motors-wiring.png",
								],
							}}
						/>
					</>

					<>
						<AssembleParts
							props={{
								id: "parts-assembly",
								title: "Assembly of Printed Parts",
								description:
									"This section covers the step-by-step process of assembling the 3D-printed components necessary for constructing the self-balancing robot. Follow these instructions to seamlessly piece together the printed parts, ensuring a sturdy and functional foundation for the robot's structure.",
								images: [
									"/projects/mini-balance-robot/assembly-img-1.jpg",
									"/projects/mini-balance-robot/assembly-img-2.jpg",
									"/projects/mini-balance-robot/assembly-img-3.jpg",
								],
								mainImage:
									"/projects/mini-balance-robot/assembly-main-image.jpg",
							}}
						/>
					</>

					<>
						<Code
							props={{
								id: "mpu6050-calibration",
								title: "MPU-6050 Calibration",
								description:
									"This section focuses on the calibration process for the MPU-6050 sensor. Proper calibration ensures accurate readings of acceleration and gyroscopic data, laying the groundwork for precise motion tracking in the self-balancing robot. Follow these steps to calibrate the MPU-6050 sensor for optimal performance.",
								githubLink: "https://github.com/Choaib-ELMADI",
								code: mpu6050CalibrationCode,
								language: "arduino",
							}}
						/>
						<p className="text-small mt-3">
							After running the calibration code, six essential values will be
							displayed in the{" "}
							<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
								Serial Monitor
							</span>
							. These values hold utmost significance as they will serve as key
							parameters in our main program.
						</p>
					</>

					<>
						<Code
							props={{
								id: "main-code-implementation",
								title: "Main Code Implementation",
								description:
									"This section delves into the core of our project, presenting the code responsible for controlling the motors of the self-balancing robot. Through this code, we orchestrate the intricate balance adjustments and movements crucial for the robot's stability and functionality. Follow along to understand how the motors are controlled to maintain the robot's balance.",
								githubLink: "https://github.com/Choaib-ELMADI",
								code: mainCodeImplementation,
								language: "arduino",
							}}
						/>
					</>

					<>
						<VideoDemonstration
							props={{
								id: "mbr-video-demonstration",
								title: "MBR: Video Demonstration",
								description:
									"This section offers a brief video demonstration showcasing the code in action. Witness the initial tests of our motor control code as we evaluate its functionality and observe the self-balancing robot in its early stages.",
								video: "/projects/mini-balance-robot/demo-video.mp4",
							}}
						/>
						<p className="text-small mt-3">
							Feel free to{" "}
							<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
								fine-tune the PID constants
							</span>{" "}
							to achieve improved results. Adjusting these constants allows for
							optimization and fine-tuning of the robot&rsquo;s balance and
							performance. Experiment with different values to enhance the
							stability and responsiveness of your self-balancing robot.
						</p>
					</>

					<>
						<Conclusion
							props={{
								title: "Conclusion",
								descriptions: [
									"Congratulations on reaching the conclusion of our self-balancing robot project journey! We've covered crucial aspects, from assembly to code implementation and testing. Remember, this is just the beginning of your exploration into robotics. Embrace the knowledge gained and continue to experiment, innovate, and push the boundaries of what's possible in the world of robotics.",
									"Keep exploring, learning, and creating!",
								],
							}}
						/>
					</>

					<>
						<NavigateToOtherProjects
							props={{
								prev: "/projects/poker-card-game",
								prevTitle: "Poker Card Game",
								next: "/projects/echolens",
								nextTitle: "EchoLens",
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
