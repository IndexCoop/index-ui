import React, { useCallback, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'react-neu'

import FancyValue from 'components/FancyValue'

import HarvestModal from './components/HarvestModal'

const Harvest: React.FC = () => {
  const [harvestModalIsOpen, setHarvestModalIsOpen] = useState(false)

  const handleDismissHarvestModal = useCallback(() => {
    setHarvestModalIsOpen(false)
  }, [setHarvestModalIsOpen])

  const handleHarvestClick = useCallback(() => {
    setHarvestModalIsOpen(true)
  }, [setHarvestModalIsOpen])

  return (
    <>
      <Card>
        <CardContent>
          <FancyValue
            icon="🍠"
            label="Unharvested YAMs"
            value="--"
          />
        </CardContent>
        <CardActions>
          <Button
            full
            onClick={handleHarvestClick}
            text="Harvest"
          />
        </CardActions>
      </Card>
      <HarvestModal
        isOpen={harvestModalIsOpen}
        onDismiss={handleDismissHarvestModal}
      />
    </>
  )
}

export default Harvest