// UploadForm.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { StoreContext } from '../StoreContext.mjs';

export default class UploadForm extends Component {
  static contextType = StoreContext;

  translateIhcId = (ihcId) => {
    const hex = ihcId.substring(1);
    return {
      hex,
      dec: parseInt(hex, 16),
    };
  }

  parseProductDatalineXML = (xml) => {
    // console.log(xml);

    // <product_dataline id="_0x258453" product_identifier="_0x2108" name="LK FUGA Statustryk 4 tast 4 dioder" locked="yes" enduser_report="yes" icon="_0x85" note="Statustryk 4 tast, 2 røde dioder og 2 grønne" helpfile="" position="" cabletype="" cablenumber="" documentation_tag="" power_group="" udf="">
    //     <dataline_input id="_0x25855a" name="Tryk (øverst venstre)" address_dataline="_0x55" note="" inivalue="off" cable_colour="" udf=""/>
    //     <dataline_output id="_0x25895b" name="Rød LED (øverst venstre)" backup="yes" type="led" address_dataline="_0x2d" note="" inivalue="off" cable_colour="" udf=""/>
    //  </product_dataline>

    // <product_dataline id="_0x41d653" product_identifier="_0x2202" name="Lampeudtag" locked="yes" icon="_0x86" position="Spot i forhave" enduser_report="no" note="" helpfile="" cabletype="" cablenumber="" documentation_tag="" power_group="" udf="">
    //     <dataline_output id="_0x41d75b" name="Udgang" backup="yes" address_dataline="_0x78" note="" inivalue="off" type="unspecified" cable_colour="" udf="">
    //        <link_to_resource id="_0x41da2c" name="Følg Link" icon="_0x4a" link="_0x41d92d" note="" udf=""/>
    //        <link_from_resource id="_0x4d632d" name="Følg Link" icon="_0x47" link="_0x4d642c" note="" udf=""/>
    //     </dataline_output>
    //     <scenes id="_0x41d849" name="Scenarier" scene_resource="_0x41d75b" note="" udf=""/>
    //  </product_dataline>

    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      productIdentifier: this.translateIhcId(xml.getAttribute('product_identifier')),
      name: xml.getAttribute('name'),
      locked: xml.getAttribute('locked') === 'yes',
      icon: this.translateIhcId(xml.getAttribute('icon')),
      position: xml.getAttribute('position'),
      inputs: [],
      outputs: [],
      scenes: [],
    };

    for (const child of xml.childNodes) {
      if (child.nodeType !== 1) {
        continue;
      }

      switch (child.nodeName) {
        case 'dataline_input':
          obj.inputs.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            addressDataline: this.translateIhcId(child.getAttribute('address_dataline')),
            note: child.getAttribute('note'),
            initialValue: child.getAttribute('inivalue') === 'on',
            cableColour: child.getAttribute('cable_colour'),
          });
          break;
        case 'dataline_output':
          obj.outputs.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            backupValue: child.getAttribute('backup') === 'yes',
            addressDataline: this.translateIhcId(child.getAttribute('address_dataline')),
            note: child.getAttribute('note'),
            initialValue: child.getAttribute('inivalue') === 'on',
            type: child.getAttribute('type'),
            cableColour: child.getAttribute('cable_colour'),
            cabletype: child.getAttribute('cabletype'),
            cablenumber: child.getAttribute('cablenumber'),
            documentationTag: child.getAttribute('documentation_tag'),
            powerGroup: child.getAttribute('power_group'),
            // Children links
          });
          break;
        case 'scenes':
          obj.scenes.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            sceneResource: this.translateIhcId(child.getAttribute('scene_resource')),
            note: child.getAttribute('note'),
          });
          break;
        default:
          throw new Error(`Unknown node name: ${child.nodeName}`);
      }
    }

    return obj;
  }

  parseProductAirlinkXML = (xml) => {
    const obj = {};
    return obj;
  }

  parseFuctionblockXML = (xml) => {
    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      name: xml.getAttribute('name'),
      note: xml.getAttribute('note'),
      locked: xml.getAttribute('locked') === 'yes',
      icon: this.translateIhcId(xml.getAttribute('icon')),
      inputs: [],
      outputs: [],
      settings: [],
      internalSettings: [],
      programs: [],
    };

    for (const input of xml.getElementsByTagName('inputs')) {
      obj.inputs.push({
        id: this.translateIhcId(input.getAttribute('id')),
        name: input.getAttribute('name'),
        icon: this.translateIhcId(input.getAttribute('icon')),
        note: input.getAttribute('note'),
      });
    }

    for (const output of xml.getElementsByTagName('outputs')) {
      obj.outputs.push({
        id: this.translateIhcId(output.getAttribute('id')),
        name: output.getAttribute('name'),
        icon: this.translateIhcId(output.getAttribute('icon')),
        note: output.getAttribute('note'),
      });
    }

    for (const setting of xml.getElementsByTagName('settings')) {
      obj.settings.push({
        id: this.translateIhcId(setting.getAttribute('id')),
        name: setting.getAttribute('name'),
        icon: this.translateIhcId(setting.getAttribute('icon')),
        note: setting.getAttribute('note'),
      });
    }

    for (const internalSetting of xml.getElementsByTagName('internalsettings')) {
      obj.internalSettings.push({
        id: this.translateIhcId(internalSetting.getAttribute('id')),
        name: internalSetting.getAttribute('name'),
        icon: this.translateIhcId(internalSetting.getAttribute('icon')),
        note: internalSetting.getAttribute('note'),
      });
    }

    for (const program of xml.getElementsByTagName('programs')) {
      obj.programs.push({
        id: this.translateIhcId(program.getAttribute('id')),
        name: program.getAttribute('name'),
        icon: this.translateIhcId(program.getAttribute('icon')),
        note: program.getAttribute('note'),
      });
    }

    return obj;
  }

  parseGroupXML = (xml) => {
    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      name: xml.getAttribute('name'),
      note: xml.getAttribute('note'),
      icon: this.translateIhcId(xml.getAttribute('icon')),
      functions: [],
      datalineProducts: [],
      airlinkProducts: [],
    };

    for (const child of xml.childNodes) {
      if (child.nodeType !== 1) {
        continue;
      }

      switch (child.nodeName) {
        case 'product_dataline':
          obj.datalineProducts.push(this.parseProductDatalineXML(child));
          break;

        case 'product_airlink':
          obj.airlinkProducts.push(this.parseProductAirlinkXML(child));
          break;

        case 'functionblock':
          obj.functions.push(this.parseFuctionblockXML(child));
          break;

        default:
          throw new Error(`Unknown node name: ${child.nodeName}`);
      }
    }

    return obj;
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];

    const { addIHCProjectGroup, clearIHCProjectGroups } = this.context.action;
    if (file) {
      const reader = new FileReader();
      const parser = new DOMParser();

      reader.onload = (loadEvent) => {
        const xml = parser.parseFromString(loadEvent.target.result, 'text/xml');
        const groupsXML = document.evaluate('/utcs_project/groups/group', xml, null, XPathResult.ANY_TYPE, null);
        let groupXML = groupsXML.iterateNext();
        while (groupXML) {
          addIHCProjectGroup(this.parseGroupXML(groupXML));
          groupXML = groupsXML.iterateNext();
        }
      };

      reader.readAsText(file, 'ISO-8859-1');
    }
  }

  render() {
    return html`
    <div class="container">
        <label for="ihc-project-file" class="form-label">IHC Project File</label>
        <input
            type="file"
            accept=".vis"
            class="form-control"
            id="ihc-project-file"
            onChange=${this.handleFileChange}
        />
    </div>
    `;
  }
}
