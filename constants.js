import * as THREE from 'three'

export const cameraPosition = new THREE.Vector3(-10, 32, 40)

export const cameraFov = 40

export const mentalDisordersArray = [
	{
		name: 'Anxiety',
		shortName: 'Anxiety',
		description:
			'Characterized by excessive worry and fear that are difficult to control.',
	},
	{
		name: 'Depression',
		shortName: 'Depress',
		description:
			'A state of low mood, loss of interest in activities, and reduced energy.',
	},
	{
		name: 'Bipolar Disorder',
		shortName: 'Bipolar',
		description:
			'A mental disorder marked by mood swings from mania to depression.',
	},
	{
		name: 'Panic Disorder',
		shortName: 'Panic',
		description:
			'Sudden episodes of intense fear or panic that occur unexpectedly.',
	},
	{
		name: 'Phobias',
		shortName: 'Phobias',
		description: 'Intense fear of specific objects, situations, or activities.',
	},
	{
		name: 'Eating Disorders',
		shortName: 'Eating Dis',
		description:
			'Disorders related to eating behavior, such as anorexia or bulimia.',
	},
	{
		name: 'Schizophrenia',
		shortName: 'Schizo',
		description:
			'A severe disorder affecting thinking, emotions, and behavior.',
	},
	{
		name: 'Post-Traumatic Stress Disorder',
		shortName: 'PTSD',
		description:
			'A condition triggered by experiencing or witnessing a traumatic event.',
	},
	{
		name: 'Obsessive-Compulsive Disorder',
		shortName: 'OCD',
		description:
			'Characterized by repetitive thoughts and behaviors that are hard to stop.',
	},
	{
		name: 'Sleep-Wake Disorders',
		shortName: 'Sleep Dis',
		description:
			'Conditions affecting the ability to sleep well on a regular basis.',
	},
	{
		name: 'Attention Deficit Hyperactivity Disorder',
		shortName: 'ADHD',
		description:
			'A disorder involving difficulty with focus, hyperactivity, and impulsiveness.',
	},
	{
		name: 'Autism Spectrum Disorder',
		shortName: 'ASD',
		description:
			'A developmental disorder affecting communication and behavior.',
	},
	{
		name: 'Borderline Personality Disorder',
		shortName: 'BPD',
		description:
			'A disorder marked by unstable moods, relationships, and self-image.',
	},
	{
		name: 'Social Anxiety Disorder',
		shortName: 'Social Anx',
		description:
			'A fear of social situations where one may feel judged or embarrassed.',
	},
	{
		name: 'Generalized Anxiety Disorder',
		shortName: 'GAD',
		description:
			'Persistent and excessive worry about various aspects of life.',
	},
	{
		name: 'Seasonal Affective Disorder',
		shortName: 'SAD',
		description:
			'Depression that occurs at specific times of the year, usually in winter.',
	},
	{
		name: 'Substance Use Disorders',
		shortName: 'Substance',
		description: 'Conditions involving the misuse of drugs or alcohol.',
	},
	{
		name: 'Dissociative Disorders',
		shortName: 'Dissociate',
		description:
			'Disorders involving a disconnection from thoughts, identity, or reality.',
	},
	{
		name: 'Somatic Symptom Disorder',
		shortName: 'Somatic',
		description: 'Characterized by physical symptoms without a medical cause.',
	},
	{
		name: 'Alzheimer’s Disease',
		shortName: 'Alzheimer',
		description:
			'A progressive disorder causing memory loss and cognitive decline.',
	},
	{
		name: 'Trauma-related Disorders',
		shortName: 'Trauma',
		description:
			'Conditions caused by experiencing or witnessing traumatic events.',
	},
	{
		name: 'Psychotic Disorders',
		shortName: 'Psychotic',
		description:
			'Disorders that affect perception and thinking, such as delusions or hallucinations.',
	},
	{
		name: 'Mood Disorders',
		shortName: 'Mood Dis',
		description:
			'Conditions that primarily affect emotional state, such as depression or mania.',
	},
	{
		name: 'Adjustment Disorders',
		shortName: 'Adjust Dis',
		description:
			'Stress-related conditions arising from difficulty coping with life changes.',
	},
]

export const mentalDrumColors = [
	'#FF5733',
	'#F39C12',
	'#28B463',
	'#3498DB',
	'#9B59B6',
	'#E74C3C',
	'#fc77a1',
	'#1ABC9C',
]

export const sideMainButtonConfig = [
	{
		index: 0,
		imagePath: '/img/buttons/face.png',
		position: new THREE.Vector3(0, 18, 9),
		lookAt: new THREE.Vector3(0, 19.5, 0),
		zoom: 5,
		targetFov: 15,
		label: 'face',
	},
	{
		index: 1,
		imagePath: '/img/buttons/brain.png',
		position: new THREE.Vector3(0, 31.1, 9),
		lookAt: new THREE.Vector3(0, 20.1, 0),
		zoom: 3,
		targetFov: 16.3,
		label: 'mental',
	},
	{
		index: 2,
		imagePath: '/img/buttons/breath.png',
		position: new THREE.Vector3(0, 13.5, 10),
		lookAt: new THREE.Vector3(0, 13.5, 0),
		zoom: 2.8,
		targetFov: 25,
		label: 'breath',
	},
]

export const bodySpherePosition = [
	{
		index: 1,
		position: new THREE.Vector3(-1.9, 1, 0.35),
		name: 'Right foot',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
			{
				name: 'Nails',
				img: '/img/toesNails.png',
			},
		],
	},
	{
		index: 2,
		position: new THREE.Vector3(1.9, 1, 0.35),
		name: 'Left foot',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
			{
				name: 'Nails',
				img: '/img/toesNails.png',
			},
		],
	},
	{
		index: 3,
		position: new THREE.Vector3(-1.7, 5.8, 0.5),
		name: 'Right knee',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 4,
		position: new THREE.Vector3(1.7, 5.8, 0.5),
		name: 'Left knee',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 5,
		position: new THREE.Vector3(-1.3, 8.8, 1.05),
		name: 'Right thigh',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 6,
		position: new THREE.Vector3(1.3, 8.8, 1.05),
		name: 'Left thigh',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 7,
		position: new THREE.Vector3(0, 10.3, 1.17),
		name: 'Groin area',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},

			{
				name: 'Venereal',
				img: '/img/venerealDiseases.png',
			},
			{
				name: 'Uterus',
				img: '/img/uterus.png',
			},
			{
				name: 'Penis',
				img: '/img/penis.png',
			},
		],
	},
	{
		index: 8,
		position: new THREE.Vector3(0, 12, -1.15),
		name: 'Lower Back',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 9,
		position: new THREE.Vector3(0, 18, -0.97),
		name: 'Neck',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 10,
		position: new THREE.Vector3(-2.55, 17, -0.72),
		name: 'Right Shoulder',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 11,
		position: new THREE.Vector3(2.55, 17, -0.72),
		name: 'Left Shoulder',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 12,
		position: new THREE.Vector3(-5.55, 11.2, -0.45),
		name: 'Right Hand',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
	{
		index: 13,
		position: new THREE.Vector3(5.55, 11.2, -0.45),
		name: 'Left Hand',
		typeBodyProblem: [
			{
				name: 'Skin',
				img: '/img/skin.png',
			},
			{
				name: 'Muscle',
				img: '/img/muscle.png',
			},
			{
				name: 'Joint',
				img: '/img/joint.png',
			},
		],
	},
]

export const faceButtonsConfig = [
	{
		index: 0,
		name: 'Teeth',
		imagePath: '/img/teeth.png',
		position: new THREE.Vector3(0, 19.7, 9),
		lookAt: new THREE.Vector3(0, 18.7, 0),
		zoom: 5,
		targetFov: 12,
	},

	{
		index: 1,
		name: 'Eyes',
		imagePath: '/img/eye.png',
		position: new THREE.Vector3(0, 20, 9),
		lookAt: new THREE.Vector3(0, 20, 0),
		zoom: 8,
		targetFov: 13,
	},
	{
		index: 2,
		name: 'Ears',
		imagePath: '/img/ear.png',
		position: new THREE.Vector3(4, 18, 9),
		lookAt: new THREE.Vector3(1.3, 19.5, 0),
		zoom: 8,
		targetFov: 8,
	},
]

export const bodyButtonsConfig = [
	{
		index: 0,
		name: 'Gastroenterologist',
		imagePath: '/img/gastro.png',
		position: new THREE.Vector3(0, 13, 13),
		lookAt: new THREE.Vector3(0, 13, 0),
		zoom: 2.8,
		targetFov: 32,
	},

	{
		index: 1,
		name: 'Lungs',
		imagePath: '/img/lungs.png',
		position: new THREE.Vector3(0, 16.5, 10),
		lookAt: new THREE.Vector3(0, 16.5, 0),
		zoom: 2.8,
		targetFov: 25,
	},
	{
		index: 2,
		name: 'Heart',
		imagePath: '/img/heart.png',
		position: new THREE.Vector3(0.5, 15.8, 10),
		lookAt: new THREE.Vector3(0.5, 15.8, 0),
		zoom: 2.8,
		targetFov: 22,
	},
]

export const svgSmilesStatus = [
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15c2-2 6-2 8 0" stroke="red" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15h8" stroke="yellow" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15c2 2 6 2 8 0" stroke="green" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
]

export const docsData = [
	{
		index: 0,
		name: 'Dr. Robert Kelso',
		specialization: 'Neurologist',
		photoPath: '/img/doctors/doc0.jpg',
		rating: '5',
		experience: '15',
		reviews: '89',
		stars: '4.8',
		description:
			'A neurologist who practices modern approaches to the diagnosis and treatment of acute and chronic pain syndromes based on the experience of leading American and European medical schools in the areas of the head, neck, back, lumbar, pelvis, and extremities.',
		price: '125',
		address: '59 Powers St',
	},
	{
		index: 1,
		name: 'Dr. Perry Cox',
		specialization: 'Cardiologist',
		photoPath: '/img/doctors/doc1.jpg',
		rating: '4.5',
		experience: '10',
		reviews: '72',
		stars: '4.2',
		description:
			'A cardiologist specializing in the diagnosis and treatment of heart diseases.',
		price: '100',
		address: '123 Main St',
	},
	{
		index: 2,
		name: 'Dr. Michael Dorian',
		specialization: 'Pediatrician',
		photoPath: '/img/doctors/doc2.jpg',
		rating: '4.8',
		experience: '18',
		reviews: '95',
		stars: '4.7',
		description:
			'A pediatrician dedicated to providing comprehensive care for children.',
		price: '110',
		address: '45 Oak Ave',
	},
	{
		index: 3,
		name: 'Dr. David Lee',
		specialization: 'Dermatologist',
		photoPath: '/img/doctors/doc4.jpg',
		rating: '4.2',
		experience: '8',
		reviews: '60',
		stars: '4.0',
		description:
			'A dermatologist specializing in the diagnosis and treatment of skin conditions.',
		price: '90',
		address: '78 Elm St',
	},
	{
		index: 4,
		name: 'Dr. Sarah Jones',
		specialization: 'Dentist',
		photoPath: '/img/doctors/doc3.jpg',
		rating: '4.9',
		experience: '12',
		reviews: '80',
		stars: '4.6',
		description:
			'A dentist providing comprehensive dental care for patients of all ages.',
		price: '120',
		address: '21 Pine St',
	},
	{
		index: 5,
		name: 'Dr. Michael Foster',
		specialization: 'Orthopedic',
		photoPath: '/img/doctors/doc6.jpg',
		rating: '4.7',
		experience: '15',
		reviews: '85',
		stars: '4.4',
		description:
			'An orthopedic surgeon specializing in the treatment of musculoskeletal disorders.',
		price: '130',
		address: '34 Maple St',
	},
	{
		index: 6,
		name: 'Dr. Emily Davis',
		specialization: 'Gynecologist',
		photoPath: '/img/doctors/doc5.jpg',
		rating: '4.6',
		experience: '10',
		reviews: '75',
		stars: '4.3',
		description: "A gynecologist providing comprehensive women's health care.",
		price: '115',
		address: '56 Birch St',
	},
	{
		index: 7,
		name: 'Dr. Christopher Martinez',
		specialization: 'Ophthalmologist',
		photoPath: '/img/doctors/doc7.jpg',
		rating: '4.8',
		experience: '12',
		reviews: '82',
		stars: '4.5',
		description:
			'An ophthalmologist specializing in the diagnosis and treatment of eye diseases.',
		price: '125',
		address: '18 Cedar St',
	},
	{
		index: 8,
		name: 'Dr. Christopher Turk',
		specialization: 'Psychiatrist',
		photoPath: '/img/doctors/doc8.jpg',
		rating: '4.4',
		experience: '9',
		reviews: '68',
		stars: '4.1',
		description:
			'A psychiatrist providing mental health care for individuals and families.',
		price: '105',
		address: '90 Willow St',
	},
	{
		index: 9,
		name: 'Dr. Todd Quinlan',
		specialization: 'Surgeon',
		photoPath: '/img/doctors/doc10.jpg',
		rating: '4.7',
		experience: '14',
		reviews: '88',
		stars: '4.4',
		description: 'A surgeon performing a wide range of surgical procedures.',
		price: '135',
		address: '25 Oak St',
	},
	{
		index: 10,
		name: 'Dr. Elliot Reid-Dorian',
		specialization: 'Pediatrician',
		photoPath: '/img/doctors/doc9.jpg',
		rating: '4.9',
		experience: '16',
		reviews: '92',
		stars: '4.7',
		description:
			'A pediatrician specializing in the care of infants and young children.',
		price: '120',
		address: '42 Maple St',
	},
]
