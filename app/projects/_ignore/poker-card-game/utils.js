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
					"If you want to test the object detection system in real-time using a webcam feed, you&rsquo;ll need a compatible webcam.",
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
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					Poker
				</span>{" "}
				is a widely played card game enjoyed in various settings globally.
				Players assess the strength of their card combinations aiming to achieve
				the best hand or outwit opponents through strategic bluffing. This game
				skillfully combines chance and tactics, making it both thrilling and
				challenging. Players employ different strategies to gain chips or tokens
				from others. Poker boasts numerous variations, with Texas Hold&rsquo;em
				standing out as one of the most recognized versions.
			</p>
			<p className="text-small mb-3">
				Welcome to{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					our Poker Hand Recognition System!
				</span>{" "}
				This innovative system utilizes YOLO (You Only Look Once), a powerful
				deep learning model, to detect and recognize various poker hand types
				such as Royal Flush, Straight Flush, and more. By harnessing the
				advanced capabilities of YOLO, we&rsquo;ve created a smart solution that
				can swiftly analyze the arrangement of cards and determine the winning
				hand in real-time.
			</p>
			<p className="text-small">
				You will have access to the{" "}
				<span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent font-semibold">
					&ldquo;playing-cards.pt&ldquo;
				</span>{" "}
				file, the optimized result of our rigorous training on Google Colab,
				enhancing the accuracy and efficiency of our Poker Hand Recognition
				System significantly.
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
				To embark on this thrilling project, ensure your system is equipped with
				the essential hardware and software. Here&rsquo;s a carefully curated
				list of requirements, customized to guarantee a smooth experience as you
				delve into the world of computer vision and deep learning.
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
			<video loop muted controls className="w-full rounded-sm max-h-[600px]">
				<source src={video} />
			</video>
		</div>
	);
};

export const Conclusion = ({ props: { title, descriptions } }) => {
	return (
		<div className="mt-8">
			<h1 className="text-medium mb-2 font-[500]">{title}</h1>
			<p className="text-small mb-3">{descriptions[0]}</p>
			<p className="text-small">{descriptions[1]}</p>
		</div>
	);
};

export const DownloadWeights = ({ link }) => {
	return (
		<Link
			href={link}
			className="w-full rounded-sm px-1 py-3 text-center text-small mt-3 bg-gradient-to-r from-pink to-purple text-background dark:text-text hover:underline"
		>
			Download our trained model weights
		</Link>
	);
};
