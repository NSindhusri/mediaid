import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, ChevronUp, Heart, Droplet, Flame, Wind, Bone } from 'lucide-react'
import './FirstAid.css'

const FirstAid = () => {
  const [expandedGuide, setExpandedGuide] = useState(null)

  const firstAidGuides = [
    {
      id: 'cpr',
      title: 'CPR (Cardiopulmonary Resuscitation)',
      icon: <Heart size={32} />,
      color: '#dc2626',
      steps: [
        'Check for responsiveness - tap the person and shout "Are you okay?"',
        'Call emergency services (108) immediately',
        'Place the person on their back on a firm surface',
        'Position your hands: Place heel of one hand on center of chest, place other hand on top',
        'Perform chest compressions: Push hard and fast, 100-120 compressions per minute',
        'After 30 compressions, give 2 rescue breaths (if trained)',
        'Continue cycles of 30 compressions and 2 breaths until help arrives',
      ],
    },
    {
      id: 'bleeding',
      title: 'Heavy Bleeding',
      icon: <Droplet size={32} />,
      color: '#dc2626',
      steps: [
        'Call emergency services immediately',
        'Have the injured person lie down and elevate the injured area',
        'Apply direct pressure to the wound with a clean cloth or bandage',
        'If bleeding continues, don\'t remove the first bandage - add more on top',
        'If possible, secure the bandage with tape or wrap',
        'Keep pressure until medical help arrives',
        'Do not use a tourniquet unless bleeding is life-threatening and you are trained',
      ],
    },
    {
      id: 'burns',
      title: 'Burns',
      icon: <Flame size={32} />,
      color: '#f59e0b',
      steps: [
        'Remove the person from the source of the burn',
        'Cool the burn with cool (not cold) running water for at least 10 minutes',
        'Remove clothing or jewelry near the burn (unless stuck to the skin)',
        'Cover the burn loosely with a sterile, non-adhesive bandage',
        'Do not break blisters or apply ointments',
        'Take over-the-counter pain reliever if needed',
        'Seek medical attention for severe burns (large, deep, or on face/hands)',
      ],
    },
    {
      id: 'choking',
      title: 'Choking',
      icon: <Wind size={32} />,
      color: '#dc2626',
      steps: [
        'If the person can cough or speak, encourage them to keep coughing',
        'If the person cannot cough or speak, perform the Heimlich maneuver:',
        'Stand behind the person, wrap your arms around their waist',
        'Place a fist just above their navel, thumb side in',
        'Grasp your fist with your other hand',
        'Give quick upward thrusts until the object is expelled',
        'If person becomes unconscious, call 108 and begin CPR',
      ],
    },
    {
      id: 'fracture',
      title: 'Fractures',
      icon: <Bone size={32} />,
      color: '#6366f1',
      steps: [
        'Keep the person still and calm',
        'Call emergency services if the fracture is severe',
        'Stop any bleeding by applying pressure (do not move the injured area)',
        'Immobilize the injured area - do not try to realign the bone',
        'Apply ice wrapped in cloth to reduce swelling',
        'Do not move the person unless necessary for safety',
        'Wait for medical professionals to handle the fracture',
      ],
    },
  ]

  const toggleGuide = (id) => {
    setExpandedGuide(expandedGuide === id ? null : id)
  }

  return (
    <div className="first-aid-page">
      <Helmet>
        <title>Emergency First Aid Guide - MediAid</title>
        <meta name="description" content="Quick reference guides for common medical emergencies like CPR, bleeding, burns, choking, and fractures." />
      </Helmet>
      <div className="page-header">
        <h1>Emergency First Aid Guide</h1>
        <p>Quick reference guide for common emergencies. Stay calm and follow the steps.</p>
      </div>

      <div className="first-aid-disclaimer">
        <p>
          <strong>Important:</strong> These guides are for informational purposes only.
          Always call emergency services (108) first in any medical emergency.
          These guides do not replace professional medical training.
        </p>
      </div>

      <div className="first-aid-guides">
        {firstAidGuides.map((guide) => (
          <div key={guide.id} className="first-aid-card">
            <button
              className="first-aid-card-header"
              onClick={() => toggleGuide(guide.id)}
            >
              <div className="guide-header-content">
                <div className="guide-icon" style={{ color: guide.color }}>
                  {guide.icon}
                </div>
                <h2>{guide.title}</h2>
              </div>
              {expandedGuide === guide.id ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </button>

            {expandedGuide === guide.id && (
              <div className="first-aid-steps">
                <ol className="steps-list">
                  {guide.steps.map((step, index) => (
                    <li key={index} className="step-item">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FirstAid
