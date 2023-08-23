import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const CategoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="code" />
            <TextField source="category_name" />
            <DateField label="create_date" source="create_date" />
        </SimpleShowLayout>
    </Show>
);