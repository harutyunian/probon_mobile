import {IMAGES_LIST} from "./mock";

const withMeta = (source: {uri: string}) => ({
    source,
    durationMs: 6500,
    postedAt: new Date().toISOString(),
});

export const mockEvent = [
    {
        id: 'user1',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[0]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[0]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[1]})},
        ]
    },
    {
        id: 'user2',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[2]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[2]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[3]})},
        ]
    },
    {
        id: 'user3',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[4]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[4]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[5]})},
        ]
    },
    {
        id: 'user4',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[6]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[6]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[7]})},
        ]
    },
    {
        id: 'user5',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[8]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[8]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[9]})},
        ]
    },
    {
        id: 'user6',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[10]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[10]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[11]})},
        ]
    },
    {
        id: 'user7',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[12]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[12]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[13]})},
        ]
    },
    {
        id: 'user8',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[14]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[14]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[15]})},
        ]
    },
    {
        id: 'user9',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[3]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[3]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[4]})},
        ]
    },
    {
        id: 'user10',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[5]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[5]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[6]})},
        ]
    },
    {
        id: 'user11',
        name: 'Hyur Service',
        avatarSource: {uri: IMAGES_LIST[7]},
        stories: [
            {id: 'story1', ...withMeta({uri: IMAGES_LIST[7]})},
            {id: 'story2', ...withMeta({uri: IMAGES_LIST[8]})},
        ]
    },
];