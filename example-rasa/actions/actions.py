# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.events import FormValidation, SlotSet, Restarted
from rasa_sdk.executor import CollectingDispatcher
import json

MOCK_CHECKBOX = json.load(
    open("actions/schemas/checkbox.json", "r")
)

class ActionRestart(Action):
    """Executes the fallback action and goes back to the previous state
    of the dialogue"""

    def name(self) -> Text:
        return "action_restart"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(response='utter_restart')

        return [Restarted()]

class ActionAskShowCheckboxFormFoodList(Action):
    """Action Ask Show Checkbox Form Food List."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_ask_show_checkbox_form_food_list"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        dispatcher.utter_message(
            text='Which food do you eat more?',
            json_message=MOCK_CHECKBOX,
        )
        return []

class ActionShowButtons(Action):
    """Show Buttons."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_buttons"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        buttons = []
        buttons.extend([
            {"title": 'Yes', "payload": "/affirm{}".format(json.dumps({"response_validation": True}))},
            {"title": 'No', "payload": "/deny{}".format(json.dumps({"response_validation": False}))},
        ])
        dispatcher.utter_message(
            text='Is it correct?',
            buttons=buttons,
        )

        return []

class ActionShowVideo(Action):
    """Show Video."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_video"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        
        video = {
            "type": "video",
            "url": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        }

        dispatcher.utter_message(
            text='Here is something to cheer you up',
            json_message=video            
        )

        return []


class ActionShowSummary(Action):
    """Show Summary."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_summary"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        slots = ["food_list"]
        food_list = tracker.get_slot(slots[0])

        variables = {
            "OPTIONS": food_list,
        }
        dispatcher.utter_message(response='utter_summary', **variables)
        
        return [SlotSet(slot, None) for slot in slots]