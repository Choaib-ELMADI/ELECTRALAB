import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const requirements = [
	{
		type: "Hardware",
		items: [
			{
				title: "Personal Computer",
				description:
					"A desktop or laptop computer with a decent processor and sufficient RAM is required.",
			},
			{
				title: "Webcam (Optional)",
				description:
					"If you want to test the object detection system in real-time using a webcam feed, you'll need a compatible webcam.",
			},
		],
	},
	{
		type: "Development Environment",
		items: [
			{
				title: "IDE",
				description:
					"You can use either Visual Studio Code (VSCode) or PyCharm as your preferred IDE.",
			},
			{
				title: "Python",
				description:
					"Ensure you have Python installed on your system. You can download the latest version of Python from the official Python website.",
			},
		],
	},
	{
		type: "Python Libraries",
		items: [
			{
				title: "cvzone==1.5.6",
				description:
					"A library that simplifies computer vision tasks in Python.",
			},
			{
				title: "ultralytics==8.0.26",
				description: "A deep learning research framework.",
			},
			{
				title: "hydra-core>=1.2.0",
				description: "A powerful configuration management tool.",
			},
			{
				title: "matplotlib>=3.2.2",
				description: "A popular data visualization library in Python.",
			},
			{
				title: "numpy>=1.18.5",
				description: "A library for numerical computations in Python.",
			},
			{
				title: "opencv-python==4.5.4.60",
				description:
					"A library for computer vision tasks, including image and video processing.",
			},
			{
				title: "Pillow>=7.1.2",
				description:
					"A Python Imaging Library that adds image processing capabilities to your Python interpreter.",
			},
			{
				title: "PyYAML>=5.3.1",
				description: "A YAML parser and emitter for Python.",
			},
			{
				title: "requests>=2.23.0",
				description: "A library for making HTTP requests in Python.",
			},
			{
				title: "scipy>=1.4.1",
				description:
					"A library for scientific and technical computing in Python.",
			},
			{
				title: "torch>=1.7.0",
				description: "The core PyTorch library for deep learning.",
			},
			{
				title: "torchvision>=0.8.1",
				description:
					"A package that provides access to popular datasets, model architectures, and image transformations for computer vision.",
			},
			{
				title: "tqdm>=4.64.0",
				description:
					"A fast, extensible progress bar for loops and other iterable functions.",
			},
			{
				title: "filterpy==1.4.5",
				description:
					"A library for Kalman filtering, particle filtering, and other methods for state estimation.",
			},
			{
				title: "scikit-image==0.19.3",
				description:
					"A collection of algorithms for image processing in Python.",
			},
			{
				title: "lap==0.4.0",
				description: "A library for linear assignment problems.",
			},
		],
	},
];

export const Introduction = () => {
	return (
		<div>
			<p className="text-small mb-3">
				Imagine a smart system that can accurately{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					count cars on the road
				</span>
				, helping us understand traffic patterns and optimize our journeys. This
				project has been a labor of love, combining my passion for technology
				with the fascination for real-world problem-solving. On this website,
				I&rsquo;ll take you on a journey behind the scenes, showing you how I
				created this intelligent car counting system from scratch.
			</p>
			<p className="text-small mb-3">
				Have you ever wondered how traffic engineers gather data about vehicles
				on the road?{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					My Car Counter Project
				</span>{" "}
				answers this question by utilizing object detection, a technology that
				enables computers to &rdquo;see&rdquo; and recognize objects in images
				or videos.{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					Using Python and the YOLO model
				</span>
				, I built a smart system that can detect and count cars in real-time.
				This project not only showcases the capabilities of modern computer
				vision but also demonstrates its practical applications in the real
				world. Whether you&rsquo;re a tech enthusiast, a budding developer, or
				just curious about how AI can enhance our daily lives, this project
				offers valuable insights into the intersection of technology and
				transportation.
			</p>
			<p className="text-small">
				In this digital space, I&rsquo;ll guide you through the entire process
				of creating{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					the Car Counter Project
				</span>
				. I&rsquo;ll share my step-by-step experiences. You&rsquo;ll gain access
				to the code snippets. Whether you&rsquo;re a beginner eager to learn or
				an experienced developer seeking inspiration, this platform is designed
				to inspire, educate, and empower. Join me in unraveling the mysteries of
				computer vision and discover the innovative world of intelligent car
				counting!
			</p>
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
				Before you dive into the world of intelligent car counting, it&rsquo;s
				essential to equip yourself with the right tools and technologies. To
				embark on this exciting project, make sure your system is geared up with
				the necessary hardware and software. Here&rsquo;s a curated list of
				requirements meticulously tailored to ensure a seamless experience as
				you explore the realms of computer vision and deep learning.
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
		</div>
	);
};

export const DemoWithImage = ({ props: { id, title, description, image } }) => {
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
			<Image
				src={image}
				width={900}
				height={400}
				draggable="false"
				alt={title}
				priority={true}
				className="w-full rounded-sm"
			/>
		</div>
	);
};

export const DemoWithVideo = ({
	props: { id, title, description, video, note },
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
			<p className="text-small mb-3">
				{description} <span className="text-red font-semibold">{note}</span>
			</p>
			<video loop muted controls className="w-full rounded-sm">
				<source src={video} />
			</video>
		</div>
	);
};

export const DemoWithRealTimeVideo = ({
	props: { id, title, description, note },
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
			<p className="text-small">
				{description} <span className="text-red font-semibold">{note}</span>
			</p>
		</div>
	);
};

export const Conclusion = ({ props: { title, descriptions } }) => {
	return (
		<div className="mt-8">
			<h1 className="text-medium mb-2 font-[500]">{title}</h1>
			<p className="text-small mb-3">{descriptions[0]}</p>
			<p className="text-small mb-3">{descriptions[1]}</p>
			<p className="text-small">{descriptions[2]}</p>
		</div>
	);
};
