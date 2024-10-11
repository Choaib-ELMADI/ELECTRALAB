import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const requirements = [
	{
		type: "Hardware",
		items: [
			{
				title: "Arduino Board",
				description:
					"Required for controlling the robot's actuators and sensors.",
			},
			{
				title: "MPU6050 Module",
				description: "For measuring acceleration and gyroscopic data.",
			},
			{
				title: "DC Motors",
				description: "For driving the robot's movement.",
			},
			{
				title: "Wheels",
				description: "To facilitate the robot's mobility.",
			},
			{
				title: "Jumper Wires",
				description: "For connecting various components.",
			},
		],
	},
	{
		type: "Development Environment",
		items: [
			{
				title: "IDE",
				description: "Arduino IDE for programming the Arduino board.",
			},
		],
	},
	{
		type: "Additional Components",
		items: [
			{
				title: "Motor Driver",
				description: "To control the motors for balance adjustments.",
			},
			{
				title: "Power Supply",
				description: "Sufficient power supply for the components.",
			},
		],
	},
	{
		type: "Arduino Libraries",
		items: [
			{
				title: "PID_v1.h",
				description: "Library for PID control.",
			},
			{
				title: "I2Cdev.h",
				description: "Library for I2C communication with devices.",
			},
			{
				title: "MPU6050_6Axis_MotionApps20.h",
				description: "Library for MPU6050 motion apps.",
			},
		],
	},
];

export const Introduction = () => {
	return (
		<div>
			<p className="text-small mb-3">
				Join me on an exciting journey as I build a fantastic{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					self-balancing robot
				</span>{" "}
				using{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					Arduino
				</span>{" "}
				and an{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					MPU6050 module
				</span>{" "}
				. This site is your gateway to discovering how I assembled this cool
				robot, step by step.
			</p>
			<p className="text-small mb-3">
				I&rsquo;ll walk you through using basic components like the Arduino
				board and MPU6050 sensor to create its balancing abilities. I&rsquo;ll
				explain everything in an easy-to-understand manner.
			</p>
			<p className="text-small mb-3">
				We&rsquo;ll delve into using{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					PID control
				</span>
				, clever coding, and electronics to teach the robot how to balance
				itself. It&rsquo;s a delightful blend of science and creativity
				that&rsquo;s both enjoyable and intriguing!
			</p>
			<p className="text-small">
				Let&rsquo;s jump in and uncover the magic behind this amazing mini
				balance robot together!
			</p>
		</div>
	);
};

export const Steps = () => {
	return (
		<div className="mt-8">
			<h1 className="text-medium mb-2 font-[500]">
				So, these are the steps we&rsquo;re going to follow to complete this
				project:
			</h1>
			<div className="ml-12 mb-4">
				<ol className="list-inside list-decimal ml-5 flex flex-col gap-1">
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#project-3d-models">3D Modeling The Robot</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#project-circuit">Arduino Circuit Diagram</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#parts-assembly">Soldering & Electronics</Link>
					</li>
					<li className="text-tiny text-secondary hover:text-text transition-all w-max">
						<Link href="#mpu6050-calibration">Arduino Code</Link>
					</li>
				</ol>
			</div>
		</div>
	);
};

export const SetUpEnvironment = ({ id }) => {
	return (
		<div id={id} className="mt-8">
			<Link
				href={`#${id}`}
				className="group text-medium mb-2 font-[500] w-max hover:text-purple transition-all"
			>
				Essential Requirements for the Project{" "}
				<LinkIcon
					size={20}
					className="inline text-secondary group-hover:text-purple transition-all"
				/>
			</Link>
			<p className="text-small mb-3">
				Before jumping into the world of building your self-balancing robot,
				it&rsquo;s crucial to have the right tools ready. To start this exciting
				project, make sure you&rsquo;ve got all the hardware and software you
				need. Here&rsquo;s a curated list of essentials, carefully put together
				to make your experience in robotics smooth and enjoyable.
			</p>
			<div className="flex flex-col gap-4">
				{requirements.map(({ type, items }) => (
					<div key={type}>
						<p className="bg-gradient-to-r from-green to-purple bg-clip-text text-transparent font-semibold w-max">
							{type}:
						</p>
						<ul className="ml-6 flex flex-col gap-2">
							{items.map(({ title, description }) => (
								<li key={title} className="">
									<p className="text-small">
										<span className="text-text font-semibold">{title}:</span>{" "}
										<span className="text-secondary">{description}</span>
									</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<p className="text-small mt-3">
				For your convenience, I&rsquo;ll supply direct links to access all the
				necessary libraries.
			</p>
		</div>
	);
};

export const RobotModeling = ({
	props: { id, title, description, images },
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

			<iframe
				width="639"
				height="480"
				title="Mini Balance Robot"
				frameborder="0"
				allowfullscreen
				mozallowfullscreen="true"
				webkitallowfullscreen="true"
				allow="clipboard-write; autoplay; fullscreen; xr-spatial-tracking"
				xr-spatial-tracking
				execution-while-out-of-viewport
				execution-while-not-rendered
				web-share
				src="https://thangs.com/model/963956/embed?utm_source=embed"
				className="w-full aspect-[2/1.2] mb-2 rounded-sm"
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 mn:grid-cols-3 gap-2">
				{images.map((image, i) => (
					<Link
						key={`image-${i}`}
						href="https://thangs.com/designer/Choaib%20ELMADI"
						target="_blank"
					>
						<Image
							src={image}
							width={400}
							height={400}
							draggable="false"
							alt={`${title} - ${i}`}
							className="w-full h-full rounded-sm object-cover"
						/>
					</Link>
				))}
			</div>
			<p className="text-small mt-3">
				You can find the 3D models available for printing on{" "}
				<Link
					className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold"
					target="_blank"
					href="https://thangs.com/designer/Choaib%20ELMADI"
				>
					my Thangs profile
				</Link>
				.
			</p>
		</div>
	);
};

export const CircuitDiagram = ({
	props: { id, title, description, images },
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
			<div className="grid grid-cols-1 md:grid-cols-2 mb-2 gap-2">
				<Image
					src={images[1]}
					width={900}
					height={400}
					draggable="false"
					alt={title}
					priority={true}
					className="w-full rounded-sm"
				/>
				<Image
					src={images[2]}
					width={900}
					height={400}
					draggable="false"
					alt={title}
					priority={true}
					className="w-full rounded-sm"
				/>
			</div>
			<div className="relative">
				<Image
					src={images[0]}
					width={900}
					height={400}
					draggable="false"
					alt={title}
					priority={true}
					className="w-full rounded-sm"
				/>
				<span className="hidden md:block absolute top-4 left-4 z-[1] bg-purple px-2 py-1 rounded-sm text-white dark:text-text text-small">
					Full Wiring
				</span>
			</div>
		</div>
	);
};

export const AssembleParts = ({
	props: { id, title, description, images, mainImage },
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
			<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2 mb-2">
				{images.map((image, i) => (
					<Link
						target="_blank"
						href="https://thangs.com/designer/Choaib%20ELMADI"
						key={`image-${i}`}
						className="relative"
					>
						<Image
							src={image}
							width={400}
							height={600}
							draggable="false"
							alt={`${title} - ${i}`}
							className="w-full aspect-[1/.8] md:aspect-[1/1.1] rounded-sm object-cover"
						/>
						<span className="absolute left-3 top-3 p-1 bg-purple text-background dark:text-text rounded-full text-normal">
							{i + 1}
						</span>
					</Link>
				))}
			</div>
			<Image
				src={mainImage}
				width={900}
				height={400}
				draggable="false"
				alt={`${title}`}
				className="w-full aspect-[1/.6] rounded-sm object-cover"
			/>
		</div>
	);
};

export const VideoDemonstration = ({
	props: { id, title, description, video },
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
			<div className="w-full h-auto max-h-[400px] flex justify-center">
				<video controls muted autoPlay className="w-full muted-video">
					<source src={video} />
				</video>
			</div>
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
