const ihcProjectFile = document.getElementById('ihc-project-file');
const ihcGroupsElement = document.getElementById('ihc-groups');

function copyToClipboardValue(value) {
    // element.select();
    // element.setSelectionRange(0, 99999);
    // navigator.clipboard.writeText(element.value);
    navigator.clipboard.writeText(value);
}


const renderGroupMemberProductDataline = (ihcGroupChild) => {
    const memberElement = document.createElement('div');
    memberElement.classList.add('group__member');

    const ihcGroupChildPosition = ihcGroupChild.getAttribute('position');
    
    const memberNameElement = document.createElement('h3');
    memberNameElement.innerHTML = `
        <i class="bi-toggles" style="font-size: 1.5rem;"></i>
        <span>${ihcGroupChild.getAttribute('name')}${ihcGroupChildPosition ? ` (${ihcGroupChildPosition})` : ''}</span>
    `;
    memberElement.appendChild(memberNameElement);
    
    for (let c of ihcGroupChild.children) {
        let ihcIdHex = c.getAttribute('id').substring(1);
        switch (c.tagName) {
            case 'dataline_input':
                const inputElement = document.createElement('div');
                inputElement.classList.add('group__member-input');
                
                inputElement.innerHTML = `
                    <i class="bi-box-arrow-right" style="font-size: 1rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(inputElement);
                break;

            case 'dataline_output':
                const outputElement = document.createElement('div');
                outputElement.classList.add('group__member-output');
                
                outputElement.innerHTML = `
                    <i class="bi-box-arrow-left" style="font-size: 1rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(outputElement);
                break;

            case 'scenes':
                break;
            default:
                throw new Error('Unknown group member type: ' + c.tagName);
        }
    }

    return memberElement;
};

const renderGroupMemberProductAirlink = (ihcGroupChild) => {
    const memberElement = document.createElement('div');
    memberElement.classList.add('group__member');

    const ihcGroupChildPosition = ihcGroupChild.getAttribute('position');

    const memberNameElement = document.createElement('h3');
    memberNameElement.innerHTML = `
        <i class="bi-wifi" style="font-size: 1.5rem;"></i>
        <span>${ihcGroupChild.getAttribute('name')}${ihcGroupChildPosition ? ` (${ihcGroupChildPosition})` : ''}</span>
    `;
    memberElement.appendChild(memberNameElement);

    for (let c of ihcGroupChild.children) {
        let ihcIdHex = c.getAttribute('id').substring(1);
        switch (c.tagName) {
            case 'dataline_input':
                const inputElement = document.createElement('div');
                inputElement.classList.add('group__member-input');
                
                inputElement.innerHTML = `
                    <i class="bi-box-arrow-right" style="font-size: 1rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(inputElement);
                break;

            case 'dataline_output':
                const outputElement = document.createElement('div');
                outputElement.classList.add('group__member-output');
                
                outputElement.innerHTML = `
                    <i class="bi-box-arrow-left" style="font-size: 1.5rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(outputElement);
                break;

            case 'airlink_dimmer_increase':
            case 'airlink_dimmer_decrease':
            case 'airlink_dimming':
            case 'light_indication':
            case 'dimmer_settings':
            case 'airlink_input':
            case 'airlink_relay':
            case 'scenes':
                break;
            
            default:
                throw new Error('Unknown group member type: ' + c.tagName);
        }
    }

    return memberElement;
};

const renderGroupMemberFunctionblock = (ihcGroupChild) => {
    const memberElement = document.createElement('div');
    memberElement.classList.add('group__member');

    const memberNameElement = document.createElement('h3');
    memberNameElement.innerHTML = `
        <i class="bi-gear" style="font-size: 1.5rem;"></i>
        <span>${ihcGroupChild.getAttribute('name')}</span>
    `;

    const ihcGroupChildNote = ihcGroupChild.getAttribute('note');
    if (ihcGroupChildNote) {
        const noteElement = document.createElement('p');
        noteElement.classList.add('group__note');
        noteElement.textContent = ihcGroupChildNote;
        memberElement.appendChild(noteElement);
    }

    memberElement.appendChild(memberNameElement);

    for (let c of ihcGroupChild.children) {
        let ihcIdHex = c.getAttribute('id').substring(1);
        switch (c.tagName) {
            case 'inputs':
                const inputElement = document.createElement('div');
                inputElement.classList.add('group__member-input');
                
                inputElement.innerHTML = `
                    <i class="bi-box-arrow-right" style="font-size: 1rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(inputElement);
                break;

            case 'outputs':
                const outputElement = document.createElement('div');
                outputElement.classList.add('group__member-output');
                
                outputElement.innerHTML = `
                    <i class="bi-box-arrow-left" style="font-size: 1rem;"></i>
                    <span>${c.getAttribute('name')}</span>
                    (
                        Hex: ${ihcIdHex} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${ihcIdHex}')" style="font-size: 1rem;"></i>
                        Decimal: ${parseInt(ihcIdHex, 16)} <i class="bi-clipboard-plus" onclick="copyToClipboardValue('${parseInt(ihcIdHex, 16)}')" style="font-size: 1rem;"></i>
                    )
                `;

                memberElement.appendChild(outputElement);
                break;

            case 'settings':
            case 'internalsettings':
            case 'programs':
                break;
            default:
                console.log(c);
                throw new Error('Unknown group member type: ' + c.tagName);
        }
    }

    return memberElement;
};

const renderGroup = (ihcGroup) => {
    const groupElement = document.createElement('div');
    groupElement.classList.add('group');

    const headlineElement = document.createElement('h1');
    headlineElement.classList.add('group__name');
    headlineElement.innerHTML = `
        <i class="bi-pin-map" style="font-size: 2rem;"></i>
        <span>${ihcGroup.getAttribute('name')}</span>
    `;
    groupElement.appendChild(headlineElement);

    const ihcGroupNote = ihcGroup.getAttribute('note');
    if (ihcGroupNote) {
        const noteElement = document.createElement('p');
        noteElement.classList.add('group__note');
        noteElement.textContent = ihcGroupNote;
        groupElement.appendChild(noteElement);
    }

    for (let i = 0; i < ihcGroup.children.length; i++) {
        const ihcGroupChild = ihcGroup.children[i];
        let groupMemberElement = null;
        switch (ihcGroupChild.tagName) {
            case 'product_dataline':
                groupMemberElement = renderGroupMemberProductDataline(ihcGroupChild);
                break;
            case 'product_airlink':
                groupMemberElement = renderGroupMemberProductAirlink(ihcGroupChild);
                break;
            case 'functionblock':
                groupMemberElement = renderGroupMemberFunctionblock(ihcGroupChild);
                break;
            default:
                console.log(ihcGroupChild.tagName);
                // throw new Error('Unknown group member type: ' + ihcGroupChild.tagName)');
        }

        if (groupMemberElement) {
            groupElement.appendChild(groupMemberElement);
        }
    }

    ihcGroupsElement.appendChild(groupElement);
};

ihcProjectFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const parser = new DOMParser();

    reader.addEventListener('load', (event) => {
        const xml = parser.parseFromString(event.target.result, 'text/xml');

        const groups = document.evaluate('/utcs_project/groups/group', xml, null, XPathResult.ANY_TYPE, null);
        let group = groups.iterateNext()
        while (group) {
            renderGroup(group);
            group = groups.iterateNext();
        }
    });

    reader.readAsText(file, 'ISO-8859-1');
});